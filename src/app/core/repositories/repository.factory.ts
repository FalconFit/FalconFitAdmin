import { FactoryProvider, InjectionToken } from "@angular/core";
import { Machine } from "../models/machine.model";
import { AUTH_MAPPING_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN,
BACKEND_TOKEN, EXERCISE_API_URL_TOKEN, EXERCISE_REPOSITORY_MAPPING_TOKEN, EXERCISE_REPOSITORY_TOKEN,
EXERCISE_RESOURCE_NAME_TOKEN, MACHINE_API_URL_TOKEN, MACHINE_REPOSITORY_MAPPING_TOKEN, MACHINE_REPOSITORY_TOKEN,
MACHINE_RESOURCE_NAME_TOKEN, PLACE_API_URL_TOKEN, PLACE_REPOSITORY_MAPPING_TOKEN, PLACE_REPOSITORY_TOKEN,
PLACE_RESOURCE_NAME_TOKEN, USERFF_API_URL_TOKEN, USERFF_REPOSITORY_MAPPING_TOKEN, USERFF_REPOSITORY_TOKEN,
USERFF_RESOURCE_NAME_TOKEN, FIREBASE_CONFIG_TOKEN } from "./repository.tokens";
import { IAuthMapping } from "../services/interfaces/auth-mapping.interface";
import { HttpClient } from "@angular/common/http";
import { Model } from "../models/base.model";
import { IBaseMapping } from "./interfaces/base-mapping.interface";
import { IBaseRepository } from "./interfaces/base-repository.interface";
import { MachineMappingStrapi } from "./impl/machine-mapping-strapi.service";
import { BaseRepositoryLocalStorageService } from "./impl/base-repository-local-storage.service";
import { IStrapiAuthentication } from "../services/interfaces/strapi-authentication.interface";
import { StrapiRepositoryService } from "./impl/strapi-repository.service";
import { MachineLocalStorageMapping } from "./impl/machine-mapping-local-storage.service";
import { BaseAuthenticationService } from "../services/impl/base-authentication.service";
import { StrapiAuthenticationService } from "../services/impl/strapi-authentication.service";
import { StrapiAuthMappingService } from "../services/impl/strapi-auth-mapping.service";
import { Userff } from "../models/userff.model";
import { UserffMappingStrapi } from "./impl/userff-mapping-strapi.service";
import { Place } from "../models/place.model";
import { PlaceMappingStrapi } from "./impl/place-mapping-strapi.service";
import { ExerciseMappingStrapi } from "./impl/exercise-mapping-strapi.service";
import { Exercise } from "../models/exercise.model";
import { BaseRepositoryFirebaseService } from "./impl/base-repository-firebase.service";
import { ExerciseMappingFirebaseService } from "./impl/exercise.mapping.firebase.service";
import { FirebaseAuthenticationService } from "../services/impl/firebase-authentication.service";
import { FirebaseAuthMappingService } from "../services/impl/firebase-auth-mapping.service";
import { MachineMappingFirebaseService } from "./impl/machine-mapping-firebase.service";

export function createBaseRepositoryFactory<T extends Model>(
  token: InjectionToken<IBaseRepository<T>>,
  dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string, http: HttpClient, auth:IStrapiAuthentication, apiURL: string, resource: string, mapping: IBaseMapping<T>, firebaseConfig?: any) => {
      switch (backend) {
        // case 'http':
        //   return new BaseRepositoryHttpService<T>(http, auth, apiURL, resource, mapping);
        case 'local-storage':
          return new BaseRepositoryLocalStorageService<T>(resource, mapping);
        case 'strapi':
          return new StrapiRepositoryService<T>(http, auth, apiURL, resource, mapping);
        case 'firebase':
          return new BaseRepositoryFirebaseService<T>(firebaseConfig, resource, mapping);
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};

export function createBaseMappingFactory<T extends Model>(
  token: InjectionToken<IBaseMapping<T>>,
  dependencies: any[],
  modelType: 'machine' | 'userff' | 'place' | 'exercise'
): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string, firebaseConfig?: any) => {
      switch (backend) {
        case 'local-storage':
          return modelType === 'machine'
            ? new MachineLocalStorageMapping()
            : null;
        case 'strapi':
          if(modelType === 'machine'){
            return new MachineMappingStrapi()
          }else if(modelType === 'place'){
            return new PlaceMappingStrapi()
          }else if(modelType === 'exercise'){
            return new ExerciseMappingStrapi()
          }else{
            return new UserffMappingStrapi()
          }
        case 'firebase':
          if(modelType === 'machine'){
            return new MachineMappingFirebaseService(firebaseConfig)
          }else if(modelType === 'exercise'){
            return new ExerciseMappingFirebaseService(firebaseConfig)
          }else{
            return new UserffMappingStrapi()
          }
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};

export function createBaseAuthMappingFactory(token: InjectionToken<IAuthMapping>, dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string) => {
      switch (backend) {
        case 'http':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'local-storage':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'json-server':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'strapi':
          return new StrapiAuthMappingService();
        case 'firebase':
          return new FirebaseAuthMappingService();
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};

export const MachineMappingFactory = createBaseMappingFactory<Machine>(
  MACHINE_REPOSITORY_MAPPING_TOKEN,
  [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN],
  'machine'
);

export const PlaceMappingFactory = createBaseMappingFactory<Place>(
  PLACE_REPOSITORY_MAPPING_TOKEN,
  [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN],
  'place'
);

export const ExerciseMappingFactory = createBaseMappingFactory<Exercise>(
  EXERCISE_REPOSITORY_MAPPING_TOKEN,
  [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN],
  'exercise'
);

export const UserffMappingFactory = createBaseMappingFactory<Userff>(
  USERFF_REPOSITORY_MAPPING_TOKEN,
  [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN],
  'userff'
);

export const AuthenticationServiceFactory:FactoryProvider = {
  provide: BaseAuthenticationService,
  useFactory: (backend:string, firebaseConfig: any, signIn:string, signUp:string, meUrl:string, mapping:IAuthMapping, http:HttpClient) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiAuthenticationService(signIn, signUp, meUrl, mapping, http);
      case 'firebase':
        return new FirebaseAuthenticationService(firebaseConfig, mapping);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }

  },
  deps: [BACKEND_TOKEN, FIREBASE_CONFIG_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_MAPPING_TOKEN, HttpClient]
};

export const AuthMappingFactory: FactoryProvider = createBaseAuthMappingFactory(AUTH_MAPPING_TOKEN, [BACKEND_TOKEN]);

export const MachineRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Machine>(MACHINE_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, MACHINE_API_URL_TOKEN, MACHINE_RESOURCE_NAME_TOKEN, MACHINE_REPOSITORY_MAPPING_TOKEN, FIREBASE_CONFIG_TOKEN]
);

export const PlaceRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Place>(PLACE_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, PLACE_API_URL_TOKEN, PLACE_RESOURCE_NAME_TOKEN, PLACE_REPOSITORY_MAPPING_TOKEN, FIREBASE_CONFIG_TOKEN]
);

export const ExerciseRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Exercise>(EXERCISE_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, EXERCISE_API_URL_TOKEN, EXERCISE_RESOURCE_NAME_TOKEN, EXERCISE_REPOSITORY_MAPPING_TOKEN, FIREBASE_CONFIG_TOKEN]
);

export const UserffRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Userff>(USERFF_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, USERFF_API_URL_TOKEN, USERFF_RESOURCE_NAME_TOKEN, USERFF_REPOSITORY_MAPPING_TOKEN, FIREBASE_CONFIG_TOKEN]
);
