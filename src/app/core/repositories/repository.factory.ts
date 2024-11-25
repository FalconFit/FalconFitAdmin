import { FactoryProvider, InjectionToken } from "@angular/core";
import { Machine } from "../models/machine.model";
import { BACKEND_TOKEN, MACHINE_REPOSITORY_MAPPING_TOKEN } from "./repository.tokens";
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

export function createBaseRepositoryFactory<T extends Model>(
  token: InjectionToken<IBaseRepository<T>>,
  dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string, http: HttpClient, auth:IStrapiAuthentication, apiURL: string, resource: string, mapping: IBaseMapping<T>) => {
      switch (backend) {
        // case 'http':
        //   return new BaseRepositoryHttpService<T>(http, auth, apiURL, resource, mapping);
        case 'local-storage':
          return new BaseRepositoryLocalStorageService<T>(resource, mapping);
        case 'strapi':
          return new StrapiRepositoryService<T>(http, auth, apiURL, resource, mapping);
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
  modelType: 'machine' | 'group'
): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string) => {
      switch (backend) {
        case 'local-storage':
          return modelType === 'machine'
            ? new MachineLocalStorageMapping()
            : null;
        case 'strapi':
          return modelType === 'machine'
            ? new MachineMappingStrapi()
            : null;
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
          // TODO return new StrapiAuthMappingService();
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};

export const MachineMappingFactory = createBaseMappingFactory<Machine>(
  MACHINE_REPOSITORY_MAPPING_TOKEN,
  [BACKEND_TOKEN],
  'machine'
);
