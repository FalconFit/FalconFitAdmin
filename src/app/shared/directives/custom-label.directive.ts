import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {

  private htmlElement: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null;

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
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

    // Si el error 'required' existe, mostramos el mensaje correspondiente
    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'MACHINE.ERRORS.SUBTITLE_REQUIRED';
      return;
    }
  }
}
