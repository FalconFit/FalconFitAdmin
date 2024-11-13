import { Observable } from "rxjs";

export interface IBaseService<T>{
  getAll():Observable<T[]>
  getById(id: string): Observable<T | null>
  add(entity: T): Observable<T>
  update(id: string, entity: T): Observable<T>
  delete(id: string): Observable<T>
}
