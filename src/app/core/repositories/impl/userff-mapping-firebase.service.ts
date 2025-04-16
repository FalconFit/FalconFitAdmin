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
      picture: data.picture ? {
        url: data.picture,
        large: data.picture,
        medium: data.picture,
        small: data.picture,
        thumbnail: data.picture
      } : undefined,
      email: data.email,
      phoneNumber: data.phoneNumber,
      registerDate: data.registerDate,
      role: data.role,
      uuid: data.uuid,
      id: data.id,
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
      name: data.name,
      surname: data.surname,
      email: data.email,
      registerDate: data.registerDate,
      phoneNumber: data.phoneNumber || '',
      role: data.role,
      uuid: data.uuid,
      picture: data.picture?.url || '',
    };

    return dataMapping
  }

  setUpdate(data: Userff): FirebaseUserff {
    const result: any = {};

    if (data.name) result.name = data.name;
    if (data.surname) result.surname = data.surname;
    if (data.email) result.email = data.email;
    if (data.phoneNumber) result.phoneNumber = data.phoneNumber;
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
