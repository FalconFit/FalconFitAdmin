import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeScannerPageRoutingModule } from './barcode-scanner-routing.module';

import { BarcodeScannerPage } from './barcode-scanner.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { QrCodeModule } from 'ng-qrcode';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodeScannerPageRoutingModule,
    TranslateModule.forChild(),
    SharedModule,
    QrCodeModule,
  ],
  declarations: [BarcodeScannerPage, BarcodeScanningModalComponent]
})
export class BarcodeScannerPageModule {}
