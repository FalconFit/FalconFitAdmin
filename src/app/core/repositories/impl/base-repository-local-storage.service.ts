import { Observable } from "rxjs";
import { IBaseRepository, SearchParams } from "../interfaces/base-repository.interface";
import { Model } from "../../models/base.model";
import { Inject, Injectable } from "@angular/core";
import { REPOSITORY_MAPPING_TOKEN, RESOURCE_NAME_TOKEN } from "../repository.tokens";
import { IBaseMapping } from "../interfaces/base-mapping.interface";

@Injectable({
  providedIn:'root'
})
export class BaseRepositoryLocalStorageService<T extends Model> implements IBaseRepository<T>{

  _items:T[] = [];
  private newID():string{
    const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      code += validChars[randomIndex];
    }
    return code;
  }

  constructor(
    @Inject(RESOURCE_NAME_TOKEN) protected resource:string, //nombre del recurso del repositorio
    @Inject(REPOSITORY_MAPPING_TOKEN) protected mapping:IBaseMapping<T>

  ) {
    let mockupList:any[] = [];
    for(let i = 0; i<100;i++){
      let mockup = {
        name:{
          title:'Mr',
          first:"Juan Antonio",
          last:"García Gómez"
        },
        age:47,
        picture:{
          large:"https://picsum.photos/id/0/200/300",
          thumbnail:"https://picsum.photos/id/0/200/300"
        }
      };
      mockup.picture.large = `https://picsum.photos/id/${i}/200/300`;
      mockup.picture.thumbnail = `https://picsum.photos/id/${i}/200/300`;
      mockupList = [...mockupList, mockup];
    }
    this._items = JSON.parse(localStorage.getItem(resource) ?? JSON.stringify(mockupList));
    localStorage.setItem(this.resource, JSON.stringify(this._items));
  }

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
