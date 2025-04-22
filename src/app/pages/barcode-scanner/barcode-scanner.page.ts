import { Component, OnInit} from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
})
export class BarcodeScannerPage implements OnInit {

  segment = 'scan';
  qrText = '' // El qr generará el valor de esta variable
  scanResult = 'https://falconfit.netlify.app/machine/peck-deck'

  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ){}

  ngOnInit(): void {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  async startScan() {
    const modal = await this.modalCtrl.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: {
      formats: [],
      lensFacing: LensFacing.Back
    }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data){
      this.scanResult = data?.barcode?.displayValue
    }

  }

  // Captura un elemento HTML, lo convierte a canvas y recoge una imagen
  captureScreen(){
    const element = document.getElementById('qrImage') as HTMLElement

    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      if(this.platform.is('capacitor')) this.shareImage(canvas)
      else this.downloadImage(canvas);
    })
  }

  // Descarga imagen (Solo web)
  downloadImage(canvas: HTMLCanvasElement){
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }

  // Comparte imagen (Solo movil)
  async shareImage(canvas: HTMLCanvasElement){
    let base64 =  canvas.toDataURL();
    let path = 'qr.png';


    const loading = await this.loadingController.create({
      spinner: 'crescent'
    });

    await loading.present();

    await Filesystem.writeFile({
      path: path,
      data: base64,
      directory: Directory.Cache,
    }).then(async (res) => {
      let uri = res.uri

      await Share.share({url: uri});
      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      })

    }).finally(() =>{
      loading.dismiss();
    })

  }

  // Leer qr de una imagen y guardar el resultado en scanResult
  async readBarcodeFromImage(){
    const { files } = await FilePicker.pickImages();

    const path = files[0]?.path

    if(!path){
      return
    }

    const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
      path,
      formats: []
    })

    this.scanResult = barcodes[0].displayValue;

  }

  // Copiar el san result al portapepeles
  writeToClipboard = async () => {
    await Clipboard.write({
      string: this.scanResult
    });

    const toast = await this.toastCtrl.create({
      message: 'Copiado a portapapeles',
      duration: 1000,
      color: 'tertiary',
      icon: 'clipboard-outline',
      position: 'middle'
    });
    toast.present();
  };

  // Chequea si el resultado del escaneo es una url
  isUrl(){
    try {
      if (this.scanResult.startsWith('http://') || this.scanResult.startsWith('https://')) {
        return true;
      }

      let domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?/;
      if (domainRegex.test(this.scanResult)) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  // Abrir navegador
  openCapacitorSite = async () => {
    let url = this.scanResult

    if(!['https://'].includes(this.scanResult)) url = 'https://' + this.scanResult

    await Browser.open({ url: url });
  };
}
