import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/services/translate.service';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {

  private htmlElement: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null;
  private _field: string = 'TITLE'; // Valor por defecto
  private _page: string = 'MACHINE'; // Valor por defecto

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  @Input() set field(value: string) {
    this._field = value;
    this.setErrorMessage();
  }

  @Input() set page(value: string) {
    this._page = value;
    this.setErrorMessage();
  }

  constructor(
    private el: ElementRef<HTMLElement>,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    // Implementación opcional; se puede dejar vacío
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;

    // Si no hay errores, limpiamos el mensaje
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);

    let translationKey = '';

    // Determinamos la clave de traducción basada en el tipo de error y el campo
    if (errors.includes('required')) {
      translationKey = `${this._page}.ERRORS.${this._field}_REQUIRED`;
    } else if (errors.includes('minlength')) {
      translationKey = `${this._page}.ERRORS.${this._field}_MIN_LENGTH`;
    } else if (errors.includes('maxlength')) {
      translationKey = `${this._page}.ERRORS.${this._field}_MAX_LENGTH`;
    } else if (errors.includes('pattern')) {
      translationKey = `${this._page}.ERRORS.${this._field}_PATTERN`;
    }

    // Si encontramos una clave de traducción válida, la traducimos
    if (translationKey) {
      this.translate.get(translationKey).subscribe(translation => {
        this.htmlElement.nativeElement.innerText = translation;
      });
    }
  }
}
