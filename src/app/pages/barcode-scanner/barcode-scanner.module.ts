import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeScannerPageRoutingModule } from './barcode-scanner-routing.module';

import { BarcodeScannerPage } from './barcode-scanner.page';
import { SharedModule } from 'src/app/shared/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodeScannerPageRoutingModule,
    SharedModule
  ],
  declarations: [BarcodeScannerPage]
})
export class BarcodeScannerPageModule {}
