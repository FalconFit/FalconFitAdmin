import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { RoleManagerService } from 'src/app/core/services/role-manager.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private roleSvc: RoleManagerService
  ) {}

  ngOnInit() {
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
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      return;
    }

    if(currentRole === 'admin'){
      this.renderer.removeStyle(this.el.nativeElement, 'display');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
