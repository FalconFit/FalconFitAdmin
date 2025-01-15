import { Inject, Injectable } from "@angular/core";
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { Paginated } from "../../models/paginated.model";
import { doc, DocumentReference, Firestore, getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIG_TOKEN } from "../repository.tokens";
import { initializeApp } from "firebase/app";
import { Exercise } from "../../models/exercise.model";
import { FirebaseExercise } from "../../models/firebase/firebase-exercise.model";

@Injectable({
  providedIn: 'root'
})
export class ExerciseMappingFirebaseService implements IBaseMapping<Exercise> {

  private db: Firestore;

  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any){
        this.db = getFirestore(initializeApp(firebaseConfig));
  }

  setAdd(data: Exercise): FirebaseExercise {
    let dataMapping:FirebaseExercise = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
    }
    if (data.machine) {
      dataMapping.machine = data.machine;
    }
    if(dataMapping.machineId){
      dataMapping.machineId = doc(this.db, 'machines', data.machineId || '')
    }
    if(dataMapping.userId){
      dataMapping.userId = doc(this.db, 'users', data.userId || '')
    }
    return dataMapping;
  }

  setUpdate(data: Partial<Exercise>): FirebaseExercise {
    const result: any = {};

    if (data.title) result.title = data.title;
    if (data.subtitle) result.subtitle = data.subtitle;
    if (data.description) result.description = data.description;
    if (data.machine) result.machine = data.machine;
    if (data.machineId) result.machineId = doc(this.db, 'machine', data.machineId || '');
    if (data.userId) result.user = data.userId || '';

    return result;
  }

  getOne(data: { id: string } & FirebaseExercise): Exercise {
    return {
      id: data.id,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      machine: data.machine,
      machineId: data.machineId?.id,
      userId: data.userId?.id,
    };
  }

  getPaginated(page: number, pageSize: number, total: number, data: ({id:string} & FirebaseExercise)[]): Paginated<Exercise> {
    return {
      page,
      pageSize,
      pages: Math.ceil(total / pageSize),
      data: data.map(item => this.getOne(item))
    };
  }

  getAdded(data: {id:string} & FirebaseExercise): Exercise {
    return this.getOne(data);
  }

  getUpdated(data: {id:string} & FirebaseExercise): Exercise {
    return this.getOne(data);
  }

  getDeleted(data: {id:string} & FirebaseExercise): Exercise {
    return this.getOne(data);
  }
}
