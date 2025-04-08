import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, BACKEND_TOKEN, EXERCISE_API_URL_TOKEN, EXERCISE_RESOURCE_NAME_TOKEN, FIREBASE_CONFIG_TOKEN, MACHINE_API_URL_TOKEN, MACHINE_RESOURCE_NAME_TOKEN, PLACE_API_URL_TOKEN, PLACE_RESOURCE_NAME_TOKEN, UPLOAD_API_URL_TOKEN, USERFF_API_URL_TOKEN, USERFF_RESOURCE_NAME_TOKEN } from './core/repositories/repository.tokens';
import { AuthenticationServiceFactory, AuthMappingFactory, ExerciseCollectionSubscriptionFactory, ExerciseMappingFactory, ExerciseRepositoryFactory, MachineCollectionSubscriptionFactory, MachineMappingFactory, MachineRepositoryFactory, MediaServiceFactory, PlaceCollectionSubscriptionFactory, PlaceMappingFactory, PlaceRepositoryFactory, UserffCollectionSubscriptionFactory, UserffMappingFactory, UserffRepositoryFactory } from './core/repositories/repository.factory';
import { MachineService } from './core/services/impl/machine.service';
import { environment } from 'src/environments/environment.prod';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { UserffService } from './core/services/impl/userff.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlaceService } from './core/services/impl/place.service';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { ExerciseService } from './core/services/impl/exercise.service';
import { RoleManagerService } from './core/services/impl/role-manager.service';

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

    { provide: BACKEND_TOKEN, useValue: 'firebase' },
    { provide: MACHINE_RESOURCE_NAME_TOKEN, useValue: 'machines' },
    { provide: EXERCISE_RESOURCE_NAME_TOKEN, useValue: 'exercises' },
    { provide: PLACE_RESOURCE_NAME_TOKEN, useValue: 'places' },
    { provide: USERFF_RESOURCE_NAME_TOKEN, useValue: 'userffs' },
    { provide: MACHINE_API_URL_TOKEN, useValue: `${environment.apiUrl}/api` },
    { provide: EXERCISE_API_URL_TOKEN, useValue: `${environment.apiUrl}/api` },
    { provide: PLACE_API_URL_TOKEN, useValue: `${environment.apiUrl}/api` },
    { provide: USERFF_API_URL_TOKEN, useValue: `${environment.apiUrl}/api` },
    { provide: AUTH_SIGN_IN_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/auth/local` },
    { provide: AUTH_SIGN_UP_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/auth/local/register` },
    { provide: AUTH_ME_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/users/me` },
    { provide: UPLOAD_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/upload` },
    { provide: FIREBASE_CONFIG_TOKEN, useValue:
      {
        apiKey: "AIzaSyAwUBB6esfEWMMUaDqrjbaDWtUvbDg0EeM",
        authDomain: "falconfit-c1f5d.firebaseapp.com",
        projectId: "falconfit-c1f5d",
        storageBucket: "falconfit-c1f5d.firebasestorage.app",
        messagingSenderId: "440094101030",
        appId: "1:440094101030:web:a45e70d5533821d8a4a0e7"
      }
    },

    AuthenticationServiceFactory,
    AuthMappingFactory,
    MachineMappingFactory,
    MachineRepositoryFactory,
    ExerciseMappingFactory,
    ExerciseRepositoryFactory,
    PlaceMappingFactory,
    PlaceRepositoryFactory,
    UserffRepositoryFactory,
    UserffMappingFactory,
    MediaServiceFactory,
    {
      provide: 'MachineService',
      useClass: MachineService
    },
    {
      provide: 'ExerciseService',
      useClass: ExerciseService
    },
    {
      provide: 'UserffService',
      useClass: UserffService
    },
    {
      provide: 'PlaceService',
      useClass: PlaceService
    },
    {
      provide: 'RoleManagerService',
      useClass: RoleManagerService
    },
    MachineCollectionSubscriptionFactory,
    ExerciseCollectionSubscriptionFactory,
    PlaceCollectionSubscriptionFactory,
    UserffCollectionSubscriptionFactory
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
