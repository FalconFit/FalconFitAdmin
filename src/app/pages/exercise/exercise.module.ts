import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercisePageRoutingModule } from './exercise-routing.module';

import { ExercisePage } from './exercise.page';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExercisePageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [ExercisePage]
})
export class ExercisePageModule {}
