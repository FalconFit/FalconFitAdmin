import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseAuthenticationService } from './core/services/impl/base-authentication.service';
import { TranslationService } from './core/services/translate.service';
import { RoleManagerService } from './core/services/role-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentLang: string;
  currentRole: string;

  constructor(
    private translateService: TranslationService,
    private roleSvc: RoleManagerService,
    public authSvc: BaseAuthenticationService,
    private router: Router,
  ) {
    this.currentLang = this.translateService.getCurrentLanguage();
    this.currentRole = this.roleSvc.getCurrentRoleValue();
  }

  changeLanguage(lang: string) {
    this.translateService.setLanguage(lang)
    this.currentLang = lang;
  }

  logout() {
    this.authSvc.signOut().subscribe(()=>{
      this.router.navigate(['/login']);
    });
  }
}
