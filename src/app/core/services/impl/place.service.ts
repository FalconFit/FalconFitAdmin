import { Inject, Injectable } from "@angular/core";
import { BaseService } from "./base-service.service";
import { PLACE_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
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
