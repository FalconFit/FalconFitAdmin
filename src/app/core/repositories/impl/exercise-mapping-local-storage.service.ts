import { Exercise } from '../../models/exercise.model';
import { Injectable } from "@angular/core";
import { Paginated } from "../../models/Paginated.model";
import { IBaseMapping } from '../interfaces/base-mapping.interface';

interface ExerciseRaw{
    id:string,
    name:{
        title:string;
        first:string;
        last:string;
    },
    description:string,
    taken:boolean,
    photo:{
        url:string,
        large:string,
        medium:string,
        small:string,
        thumbnail:string
    }
}

@Injectable({
    providedIn: 'root'
  })
  export class ExerciseLocalStorageMapping implements IBaseMapping<Exercise> {
    setAdd(data: Exercise) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize:number, pages:number, data: ExerciseRaw[]): Paginated<Exercise> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Exercise>((d:ExerciseRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: ExerciseRaw):Exercise {
        return {
            id:data.id,
            title:data.name.first,
            subtitle:data.name.last,
            description:data.description,
            };
    }
    getAdded(data: ExerciseRaw):Exercise {
        return this.getOne(data);
    }
    getUpdated(data: ExerciseRaw):Exercise {
        return this.getOne(data);
    }
    getDeleted(data: ExerciseRaw):Exercise {
        return this.getOne(data);
    }
  }
