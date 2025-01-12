import { Inject, Injectable } from '@angular/core';
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { Paginated } from '../../models/Paginated.model';
import { doc, Firestore, getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG_TOKEN } from '../repository.tokens';
import { initializeApp } from 'firebase/app';
import { Machine } from '../../models/machine.model';
import { FirebaseMachine } from '../../models/firebase/firebase-machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachineMappingFirebaseService implements IBaseMapping<Machine> {


  private db: Firestore;

  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any){
        this.db = getFirestore(initializeApp(firebaseConfig));
  }
  getOne(data: { id: string } & FirebaseMachine): Machine {
    return {
      id: data.id,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      taken: data.taken,
      exerciseId: data.exerciseId?.id,
      userId: data.userId?.id,
    };
  }

  getPaginated(page: number, pageSize: number, pages: number, data: ({ id: string } & FirebaseMachine)[]): Paginated<Machine> {
    return {
      page,
      pageSize,
      pages,
      data: data.map(item => this.getOne(item))
    };
  }

  setAdd(data: Machine): FirebaseMachine {
    let dataMapping: FirebaseMachine = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      taken: data.taken
    };
    if(dataMapping.exerciseId){
      dataMapping.exerciseId = doc(this.db, 'exercise', data.exerciseId || '');
    }
    if(dataMapping.userId){
      dataMapping.userId = doc(this.db, 'machine', data.userId || '')
    }
    return dataMapping
  }

  setUpdate(data: Machine): FirebaseMachine {
    const result: any = {};

    if (data.title) result.title = data.title;
    if (data.subtitle) result.subtitle = data.subtitle;
    if (data.description) result.description = data.description;
    if (data.taken) result.taken = data.taken;
    if (data.exerciseId) result.exerciseId = doc(this.db, 'machine', data.exerciseId || '');
    if (data.userId) result.user = data.userId || '';

    return result;
  }

  getAdded(data:{id:string} & FirebaseMachine): Machine {
    return this.getOne(data);
  }

  getUpdated(data:{id:string} & FirebaseMachine): Machine {
    return this.getOne(data);
  }

  getDeleted(data:{id:string} & FirebaseMachine): Machine {
    return this.getOne(data);
  }
}
