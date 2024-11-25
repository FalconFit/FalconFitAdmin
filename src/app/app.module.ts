import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, BACKEND_TOKEN, MACHINE_API_URL_TOKEN, MACHINE_RESOURCE_NAME_TOKEN, UPLOAD_API_URL_TOKEN } from './core/repositories/repository.tokens';
import { MachineMappingFactory } from './core/repositories/repository.factory';
import { MachineService } from './core/services/impl/machine.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    { provide: BACKEND_TOKEN, useValue: 'strapi' },
    { provide: MACHINE_RESOURCE_NAME_TOKEN, useValue: 'machine' },
    { provide: MACHINE_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: AUTH_SIGN_IN_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local' },
    { provide: AUTH_SIGN_UP_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local/register' },
    { provide: AUTH_ME_API_URL_TOKEN, useValue: 'http://localhost:1337/api/users/me' },
    { provide: UPLOAD_API_URL_TOKEN, useValue: 'http://localhost:1337/api/upload' },

    MachineMappingFactory,

    {
      provide: 'MachineService',
      useClass: MachineService
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
