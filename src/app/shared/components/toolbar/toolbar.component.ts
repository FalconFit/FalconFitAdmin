import { Component, Input, OnInit } from '@angular/core';
import { BaseAuthenticationService } from 'src/app/core/services/impl/base-authentication.service';
import { Observable, switchMap, of } from 'rxjs';
import { User } from 'src/app/core/models/auth.model';
import { UserffService } from '../../../core/services/impl/userff.service';
import { Userff } from 'src/app/core/models/userff.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title: string = '';
  user$: Observable<User | undefined>;
  userff$: Observable<Userff | null> = of(null);

  constructor(
    private authSvc: BaseAuthenticationService,
    private userSvc: UserffService
  ) {
    this.user$ = this.authSvc.user$;
  }

  ngOnInit() {
    this.userff$ = this.user$.pipe(
      switchMap(user => {
        if (user && user.id) {
          // Usamos el ID del usuario para obtener la información detallada
          return this.userSvc.getByUuid(user.id);
        }
        return of(null); // Si no hay usuario, retornamos null
      })
    );
  }
}
