import { Inject, Injectable } from "@angular/core";
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { Paginated } from "../../models/paginated.model";
import { doc, Firestore, getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIG_TOKEN } from "../repository.tokens";
import { initializeApp } from "firebase/app";
import { Place } from "../../models/place.model";
import { FirebasePlace } from "../../models/firebase/firebase-place.model";

@Injectable({
  providedIn: 'root'
})
export class PlaceMappingFirebaseService implements IBaseMapping<Place> {

  private db: Firestore;

  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any){
        this.db = getFirestore(initializeApp(firebaseConfig));
  }

  setAdd(data: Place): FirebasePlace {
    let dataMapping:FirebasePlace = {
      title: data.title,
      description: data.description,
      latitud: data.latitud,
      longitud: data.longitud
    }
    return dataMapping;
  }

  setUpdate(data: Partial<Place>): FirebasePlace {
    const result: any = {};

    if (data.title) result.title = data.title;
    if (data.description) result.description = data.description;
    if (data.latitud) result.latitud = data.latitud;
    if (data.longitud) result.longitud = data.longitud;

    return result;
  }

  getOne(data: { id: string } & FirebasePlace): Place {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      latitud: data.latitud,
      longitud: data.longitud,
    };
  }

  getPaginated(page: number, pageSize: number, total: number, data: ({id:string} & FirebasePlace)[]): Paginated<Place> {
    return {
      page,
      pageSize,
      pages: Math.ceil(total / pageSize),
      data: data.map(item => this.getOne(item))
    };
  }

  getAdded(data: {id:string} & FirebasePlace): Place {
    return this.getOne(data);
  }

  getUpdated(data: {id:string} & FirebasePlace): Place {
    return this.getOne(data);
  }

  getDeleted(data: {id:string} & FirebasePlace): Place {
    return this.getOne(data);
  }
}
