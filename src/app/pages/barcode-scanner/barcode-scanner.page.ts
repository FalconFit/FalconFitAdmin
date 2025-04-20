import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
})
export class BarcodeScannerPage {

  segment = 'generate';

  constructor(){}

}
