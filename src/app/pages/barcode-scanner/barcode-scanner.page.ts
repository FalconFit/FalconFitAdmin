import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
})
export class BarcodeScannerPage {

  segment = 'generate'; // Inicialmente esta comienza en generate
  qrText = '' // El qr generará el valor de esta variable

  constructor(
    private loadingController: LoadingController,
    private platform: Platform
  ){}

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
}
