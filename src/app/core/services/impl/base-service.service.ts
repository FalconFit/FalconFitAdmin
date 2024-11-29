import { Observable } from "rxjs";
import { Model } from "../../models/base.model";
import { IBaseService } from "../interfaces/base-service.interface";
import { Inject } from "@angular/core";
import { REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IBaseRepository, SearchParams } from "../../repositories/interfaces/base-repository.interface";
import { Paginated } from "../../models/Paginated.model";

export class BaseService<T extends Model> implements IBaseService<T>{
  constructor(
    @Inject (REPOSITORY_TOKEN) protected repository: IBaseRepository<T>
  ){}

  getAll(): Observable<T[]>;
  getAll(page:number, pageSize:number):Observable<Paginated<T>>;
  getAll(page:number=-1, pageSize:number=25, filters:SearchParams={}): Observable<T[]| Paginated<T>> {
    return this.repository.getAll(page, pageSize, filters);
  }

  getById(id: string): Observable<T | null> {
    return this.repository.getById(id);
  }

  add(entity: T): Observable<T> {
    return this.repository.add(entity);
  }

  update(id: string, entity: T): Observable<T> {
    return this.repository.update(id, entity);
  }

  delete(id: string): Observable<T> {
    return this.repository.delete(id);
  }

}
