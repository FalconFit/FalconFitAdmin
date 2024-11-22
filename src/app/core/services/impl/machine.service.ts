import { Inject, Injectable } from "@angular/core";
import { Machine } from "../../models/machine.model";
import { IMachineService } from "../interfaces/machine-service.interface";
import { BaseService } from "./base-service.service";
import { IMachineRepository } from "../../repositories/interfaces/machine-repository.interface";
import { MACHINE_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";

@Injectable({
  providedIn: 'root'
})
export class MachineService extends BaseService<Machine> implements IMachineService{
  constructor(
    @Inject(MACHINE_REPOSITORY_TOKEN) repository: IMachineRepository
  ){
    super(repository)
  }

}
