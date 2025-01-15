import { Component, Input } from '@angular/core';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() title: string = '';
  user$: Observable<User | undefined>;

  constructor(private authSvc: BaseAuthenticationService) {
    this.user$ = this.authSvc.user$;
  }
}
