import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, BACKEND_TOKEN, MACHINE_API_URL_TOKEN, MACHINE_RESOURCE_NAME_TOKEN, PLACE_API_URL_TOKEN, PLACE_RESOURCE_NAME_TOKEN, UPLOAD_API_URL_TOKEN, USERFF_API_URL_TOKEN, USERFF_RESOURCE_NAME_TOKEN } from './core/repositories/repository.tokens';
import { AuthenticationServiceFactory, AuthMappingFactory, MachineMappingFactory, MachineRepositoryFactory, PlaceMappingFactory, PlaceRepositoryFactory, UserffMappingFactory, UserffRepositoryFactory } from './core/repositories/repository.factory';
import { MachineService } from './core/services/impl/machine.service';
import { environment } from 'src/environments/environment.prod';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { UserffService } from './core/services/impl/userff.service';
import { MachineFormComponent } from './shared/components/machine-form/machine-form.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlaceService } from './core/services/impl/place.service';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    GoogleMapsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideLottieOptions({
      player: () => player,
    }),
    provideHttpClient(),

    { provide: BACKEND_TOKEN, useValue: 'strapi' },
    { provide: MACHINE_RESOURCE_NAME_TOKEN, useValue: 'machines' },
    { provide: PLACE_RESOURCE_NAME_TOKEN, useValue: 'places' },
    { provide: USERFF_RESOURCE_NAME_TOKEN, useValue: 'userffs' },
    { provide: MACHINE_API_URL_TOKEN, useValue: `http://localhost:1337/api` },
    { provide: PLACE_API_URL_TOKEN, useValue: `http://localhost:1337/api` },
    { provide: USERFF_API_URL_TOKEN, useValue: `http://localhost:1337/api` },
    { provide: AUTH_SIGN_IN_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/auth/local` },
    { provide: AUTH_SIGN_UP_API_URL_TOKEN, useValue: 'http://localhost:1337/api/auth/local/register' },
    { provide: AUTH_ME_API_URL_TOKEN, useValue: 'http://localhost:1337/api/users/me' },
    { provide: UPLOAD_API_URL_TOKEN, useValue: 'http://localhost:1337/api/upload' },

    AuthenticationServiceFactory,
    AuthMappingFactory,
    MachineMappingFactory,
    MachineRepositoryFactory,
    PlaceMappingFactory,
    PlaceRepositoryFactory,
    UserffRepositoryFactory,
    UserffMappingFactory,
    {
      provide: 'MachineService',
      useClass: MachineService
    },
    {
      provide: 'UserffService',
      useClass: UserffService
    },
    {
      provide: 'PlaceService',
      useClass: PlaceService
    },

  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
