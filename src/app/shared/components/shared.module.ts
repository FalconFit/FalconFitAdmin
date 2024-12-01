import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RoutingBarComponent } from './routing-bar/routing-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MachineFormComponent } from './machine-form/machine-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MapModuleComponent } from './map-module/map-module.component';



@NgModule({
    declarations: [RoutingBarComponent, MachineFormComponent, MapModuleComponent,  MapComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    TranslateModule.forChild()
  ],
  exports:[RoutingBarComponent]
})
export class SharedModule { }
