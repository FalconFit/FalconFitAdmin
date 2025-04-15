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
import { PictureSelectableComponent } from './picture-selectable/picture-selectable.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { MachineSelectableComponent } from './machine-selectable/machine-selectable.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ShowPasswordPipe } from '../pipes/show-password.pipe';
import { CustomLabelDirective } from '../directives/custom-label.directive';
import { RoleDirective } from '../directives/showOrNotRole.directive';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
    declarations: [
    RoutingBarComponent,
    MachineFormComponent,
    MapModuleComponent,
    MapComponent,
    PictureSelectableComponent,
    ExerciseFormComponent,
    MachineSelectableComponent,
    ToolbarComponent,
    UserFormComponent,
    ShowPasswordPipe,
    CustomLabelDirective,
    RoleDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    TranslateModule.forChild()
  ],
  exports:[RoutingBarComponent,
    MachineFormComponent,
    MapModuleComponent,
    MapComponent,
    PictureSelectableComponent,
    ExerciseFormComponent,
    MachineSelectableComponent,
    ToolbarComponent,
    UserFormComponent,
    ShowPasswordPipe,
    CustomLabelDirective,
    RoleDirective
  ]
})
export class SharedModule { }
