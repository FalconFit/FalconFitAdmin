import { Observable } from "rxjs";
import { IBaseRepository, SearchParams } from "../interfaces/base-repository.interface";
import { Model } from "../../models/base.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class BaseRepositoryLocalStorageService<T extends Model> implements IBaseRepository<T>{
  getAll(page: number, pageSize: number, filters: SearchParams): Observable<T[]> {
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
