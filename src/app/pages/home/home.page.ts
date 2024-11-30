import { Component } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translate.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private translationService: TranslationService) {}

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }


}
