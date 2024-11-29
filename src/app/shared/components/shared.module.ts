import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RoutingBarComponent } from './routing-bar/routing-bar.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RoutingBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports:[RoutingBarComponent]
})
export class SharedModule { }
