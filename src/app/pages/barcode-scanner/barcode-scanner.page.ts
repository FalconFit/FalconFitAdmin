import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result, BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
})
export class BarcodeScannerPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scanner')
  scanner!: ZXingScannerComponent;

  qrResultString: string = '';
  qrResult: Result | null = null;

  // Estados del escáner
  hasDevices: boolean = false;
  hasPermission: boolean = false;
  isInitialized: boolean = false;
  isScanning: boolean = false;

  // Mensaje de estado para el usuario
  statusMessage: string = 'Inicializando cámara...';

  allowedFormats: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX
  ];

  constructor() { }

  ngOnInit() {
    // No intentamos acceder al scanner aquí
    this.statusMessage = 'Inicializando...';
  }

  ngAfterViewInit() {
    // Ahora es seguro acceder al scanner
    if (this.scanner) {
      this.isInitialized = true;
      this.setupScanner();
    } else {
      this.statusMessage = 'Error: No se pudo inicializar el escáner';
    }
  }

  ngOnDestroy() {
    // Limpieza al salir del componente
    this.stopScanner();
  }

  setupScanner() {
    this.statusMessage = 'Buscando cámaras...';

    // Comprueba si hay cámaras disponibles
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = devices && devices.length > 0;

      if (this.hasDevices) {
        this.statusMessage = 'Cámaras encontradas. Solicitando permisos...';
        // Intenta elegir la cámara trasera por defecto
        const backCamera = devices.find(device =>
          /back|rear|environment/gi.test(device.label));
        if (backCamera) {
          // this.scanner.changeDevice(backCamera);
        }
      } else {
        this.statusMessage = 'No se encontraron cámaras en tu dispositivo';
      }
    });

    // Maneja la respuesta de permisos
    this.scanner.permissionResponse.subscribe((permission: boolean) => {
      this.hasPermission = permission;

      if (permission) {
        this.statusMessage = 'Permisos concedidos. Listo para escanear.';
        this.startScanner();
      } else {
        this.statusMessage = 'Acceso a la cámara denegado. Por favor, concede permisos para usar el escáner.';
      }
    });

    // Maneja errores durante el escaneo
    this.scanner.scanError.subscribe((error: Error) => {
      console.error('Error de escaneo:', error);
      this.statusMessage = `Error: ${error.message || 'Se produjo un error durante el escaneo'}`;
    });
  }

  startScanner() {
    if (this.isInitialized && this.hasPermission) {
      this.scanner.enable = true;
      this.isScanning = true;
    }
  }

  stopScanner() {
    if (this.scanner && this.isInitialized) {
      this.scanner.enable = false;
      this.isScanning = false;
    }
  }

  toggleScanner() {
    if (this.isScanning) {
      this.stopScanner();
      this.statusMessage = 'Escáner pausado';
    } else {
      this.startScanner();
      this.statusMessage = 'Escaneando...';
    }
  }

  handleQrResult(resultString: string) {
    console.log('Result string:', resultString);
    this.qrResultString = resultString;

    // Opcional: Pausar el escáner después de un resultado exitoso
    // this.stopScanner();
    // this.statusMessage = 'Código escaneado con éxito';
  }

  resetScan() {
    this.qrResultString = '';
    this.qrResult = null;

    // Reiniciar el escáner si está pausado
    if (!this.isScanning && this.isInitialized && this.hasPermission) {
      this.startScanner();
      this.statusMessage = 'Escaneando nuevamente...';
    }
  }
}
