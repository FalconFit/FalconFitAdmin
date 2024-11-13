import { Observable } from "rxjs";
import { Model } from "../../models/base.model";
import { IBaseService } from "../interfaces/base-service.interface";
import { Inject } from "@angular/core";
import { REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IBaseRepository } from "../../repositories/interfaces/base-repository.interface";

export class BaseService<T extends Model> implements IBaseService<T>{
  constructor(
    @Inject (REPOSITORY_TOKEN) protected repository: IBaseRepository<T>
  ){}

  getAll(): Observable<T[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Observable<T | null> {
    throw new Error("Method not implemented.");
  }
  add(entity: T): Observable<T> {
    throw new Error("Method not implemented.");
  }
  update(id: string, entity: T): Observable<T> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Observable<T> {
    throw new Error("Method not implemented.");
  }

}
