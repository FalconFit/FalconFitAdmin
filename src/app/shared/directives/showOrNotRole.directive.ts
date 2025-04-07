import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { FirebaseAuthenticationService } from 'src/app/core/services/impl/firebase-authentication.service';
import { User } from '../../core/models/auth.model';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {
  @Input('appRole') allowedRoles: string[] = ['admin', 'user']; // Recibe los roles permitidos

  constructor(private el: ElementRef, private renderer: Renderer2, private authService: BaseAuthenticationService) {}


  ngOnInit() {
    // const user = this.authService.user$(); // Obtiene el usuario autenticado

    // if (!this.allowedRoles.includes(user)) {
    //   // Si el rol del usuario no está en la lista de permitidos, deshabilita el botón
    //   this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    //   this.renderer.addClass(this.el.nativeElement, 'disabled');
    // }
  }
}
