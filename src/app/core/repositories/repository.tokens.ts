import { InjectionToken } from "@angular/core";
import { IBaseRepository } from "./interfaces/base-repository.interface";
import { IMachineRepository } from "./interfaces/machine-repository.interface";
import { Machine } from "../models/machine.model";
import { IBaseMapping } from "./interfaces/base-mapping.interface";
import { IStrapiAuthentication } from "../services/interfaces/strapi-authentication.interface";
import { IAuthentication } from "../services/interfaces/authentication.interface";
import { IUserffRepository } from "./interfaces/userff-repository.interface";

export const RESOURCE_NAME_TOKEN = new InjectionToken<string>('ResourceName');
export const MACHINE_RESOURCE_NAME_TOKEN = new InjectionToken<IMachineRepository>('MachineResourceName');
export const USERFF_RESOURCE_NAME_TOKEN = new InjectionToken<IUserffRepository>('MachineResourceName');
export const REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('REPOSITORY_TOKEN');
export const MACHINE_REPOSITORY_TOKEN = new InjectionToken<IMachineRepository>('IMachineRepository');
export const USERFF_REPOSITORY_TOKEN = new InjectionToken<IUserffRepository>('IUserffRepository');

export const API_URL_TOKEN = new InjectionToken<string>('ApiUrl');
export const MACHINE_API_URL_TOKEN = new InjectionToken<string>('MachineApiUrl');
export const USERFF_API_URL_TOKEN = new InjectionToken<string>('UserffApiUrl');
export const AUTH_SIGN_IN_API_URL_TOKEN = new InjectionToken<string>('AuthSignInApiUrl');
export const AUTH_SIGN_UP_API_URL_TOKEN = new InjectionToken<string>('AuthSignUpApiUrl');
export const AUTH_ME_API_URL_TOKEN = new InjectionToken<string>('AuthMeApiUrl');
export const UPLOAD_API_URL_TOKEN = new InjectionToken<string>('UploadApiUrl');


export const REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<any>>('IBaseRepositoryMapping');
export const MACHINE_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Machine>>('IMachineRepositoryMapping');
export const AUTH_TOKEN = new InjectionToken<IAuthentication>('IAuthentication');
export const STRAPI_AUTH_TOKEN = new InjectionToken<IStrapiAuthentication>('IStrapiAuthentication');
export const AUTH_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Machine>>('IAuthMapping');
export const BACKEND_TOKEN = new InjectionToken<string>('Backend');
