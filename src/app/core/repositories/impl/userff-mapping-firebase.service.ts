import { Inject, Injectable } from '@angular/core';
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { Paginated } from '../../models/paginated.model';
import { doc, Firestore, getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG_TOKEN } from '../repository.tokens';
import { initializeApp } from 'firebase/app';
import { Userff } from '../../models/userff.model';
import { FirebaseUserff } from '../../models/firebase/firebase-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserffMappingFirebaseService implements IBaseMapping<Userff> {

  private db: Firestore;

  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any){
        this.db = getFirestore(initializeApp(firebaseConfig));
  }
  getOne(data: { id: string } & FirebaseUserff): Userff {
    return {
      name: data.name,
      surname: data.surname,
      role: data.role,
      id: data.id,
      uuid: data.uuid,
    };
  }

  getPaginated(page: number, pageSize: number, pages: number, data: ({ id: string } & FirebaseUserff)[]): Paginated<Userff> {
    return {
      page,
      pageSize,
      pages,
      data: data.map(item => this.getOne(item))
    };
  }

  setAdd(data: Userff): FirebaseUserff {
    let dataMapping: FirebaseUserff = {
      picture: data.picture?.url || '',
      name: data.name,
      surname: data.surname,
      role: data.role,
      uuid: data.uuid
    };

    return dataMapping
  }

  setUpdate(data: Userff): FirebaseUserff {
    const result: any = {};

    if (data.name) result.name = data.name;
    if (data.surname) result.surname = data.surname;
    if (data.role) result.role = data.role;
    if (data.uuid) result.user = data.uuid || '';
    if (data.picture) result.picture = data.picture?.url || '';

    return result;
  }

  getAdded(data:{id:string} & FirebaseUserff): Userff {
    return this.getOne(data);
  }

  getUpdated(data:{id:string} & FirebaseUserff): Userff {
    return this.getOne(data);
  }

  getDeleted(data:{id:string} & FirebaseUserff): Userff {
    return this.getOne(data);
  }
}
