import { Inject, Injectable } from "@angular/core";
import { Machine } from "../../models/machine.model";
import { IMachineService } from "../interfaces/machine-service.interface";
import { BaseService } from "./base-service.service";
import { IMachineRepository } from "../../repositories/interfaces/machine-repository.interface";
import { MACHINE_REPOSITORY_TOKEN, PLACE_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { Place } from "../../models/place.model";
import { IPlaceRepository } from "../../repositories/interfaces/place-repository.interface";

@Injectable({
  providedIn: 'root'
})
export class PlaceService extends BaseService<Place> implements IPlaceRepository{
  constructor(
    @Inject(PLACE_REPOSITORY_TOKEN) repository: IPlaceRepository
  ){
    super(repository)
  }

}
