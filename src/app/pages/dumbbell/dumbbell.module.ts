import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { IonicModule } from '@ionic/angular';

import { DumbbellPageRoutingModule } from './dumbbell-routing.module';

import { DumbbellPage } from './dumbbell.page';
// import { provideLottieOptions, LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DumbbellPageRoutingModule,
    // LottieModule,
  ],
  providers:[
    // provideLottieOptions({
    //   player: () => player,
    // }),
  ],
  // declarations: [DumbbellPage]
})
export class DumbbellPageModule {}
