import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Place } from 'src/app/core/models/place.model';

@Component({
  selector: 'app-map-module',
  templateUrl: './map-module.component.html',
  styleUrls: ['./map-module.component.scss'],
})
export class MapModuleComponent  implements OnInit {

  formGroup:FormGroup;
  mode:'new'|'edit' = 'new';
  isMobile: boolean = false;
  picture: string | null = null;

  @Input() set location(_places:Place){
    if(_places && _places.id)
      this.mode = 'edit';

    this.formGroup.controls['title'].setValue(_places.title);
    this.formGroup.controls['description'].setValue(_places.description);
  }

  constructor(
    private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform
  ) {
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
    this.formGroup = this.fb.group({
      title:['', [Validators.required, Validators.minLength(2)]],
      description:['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.picture = e.target.result; // Guardar la imagen como base64 para la previsualización
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {}

  get title(){
    return this.formGroup.controls['title'];
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
