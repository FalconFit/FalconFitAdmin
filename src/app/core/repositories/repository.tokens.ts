import { InjectionToken } from "@angular/core";
import { IBaseRepository } from "./interfaces/base-repository.interface";
import { IMachineRepository } from "./interfaces/machine-repository.interface";


export const REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('REPOSITORY_TOKEN')
export const MACHINE_REPOSITORY_TOKEN = new InjectionToken<IMachineRepository>('IMachineRepository');
