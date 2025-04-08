import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { RoleManagerService } from 'src/app/core/services/impl/role-manager.service';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {
  private htmlElement: ElementRef<HTMLElement>;

  constructor(
    private el: ElementRef<HTMLElement>,
    private roleSvc: RoleManagerService,
  ) {
    this.htmlElement = el
  }

  ngOnInit() {
    const userRole = this.roleSvc.getCurrentRoleValue()

    if(userRole){
      if(userRole === 'user'){
        this.el.nativeElement.hidden = true
        return;
      }
    }
  }

}
