import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { RoleManagerService } from 'src/app/core/services/impl/role-manager.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    private el: ElementRef<HTMLElement>,
    private roleSvc: RoleManagerService
  ) {}

  ngOnInit() {
    // Nos suscribimos a los cambios de rol
    this.subscription = this.roleSvc.currentRole$.subscribe(currentRole => {
      this.updateElementVisibility(currentRole);
    });

    // También verificamos el valor actual por si ya está establecido
    const currentRole = this.roleSvc.getCurrentRoleValue();
    this.updateElementVisibility(currentRole);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateElementVisibility(currentRole: string | null): void {
    if (!currentRole) {
      this.el.nativeElement.hidden = true;
      return;
    }

    if(currentRole == 'admin'){
      this.el.nativeElement.hidden = false;
    }else{
      this.el.nativeElement.hidden = true;
    }
  }

}
