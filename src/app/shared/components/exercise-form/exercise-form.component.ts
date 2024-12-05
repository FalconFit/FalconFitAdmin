import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Exercise } from '../../../core/models/exercise.model';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
})
export class ExerciseFormComponent  implements OnInit {

  formGroup:FormGroup;
  mode:'new'|'edit' = 'new';
  isMobile: boolean = false;
  picture: string | null = null;

  @Input() set exercise(_exercise:Exercise){
    if(_exercise && _exercise.id)
      this.mode = 'edit';

    this.formGroup.controls['title'].setValue(_exercise.title);
    this.formGroup.controls['subtitle'].setValue(_exercise.subtitle);
    this.formGroup.controls['description'].setValue(_exercise.description);
  }

  constructor(
    private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform
  ) {
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
    this.formGroup = this.fb.group({
      title:['', [Validators.required, Validators.minLength(2)]],
      subtitle:['', [Validators.required, Validators.minLength(2)]],
      description:['', [Validators.required, Validators.maxLength(500)]],
      machineId:[null,[]]
    });
  }


  ngOnInit() {}

  get title(){
    return this.formGroup.controls['title'];
  }

  get subtitle(){
    return this.formGroup.controls['subtitle'];
  }

  get description(){
    return this.formGroup.controls['description'];
  }

  getDirtyValues(formGroup: FormGroup): any {
    const dirtyValues: any = {};

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control?.dirty) {
        dirtyValues[key] = control.value;
      }
    });

    return dirtyValues;
  }

  onSubmit(){
    if (this.formGroup.valid) {
      this.modalCtrl.dismiss(
          (this.mode=='new'?
            this.formGroup.value:
            this.getDirtyValues(this.formGroup)), this.mode
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
