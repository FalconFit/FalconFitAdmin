import { Injectable } from "@angular/core";
import { Paginated } from "../../models/Paginated.model";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Meta } from "@angular/platform-browser";
import { Exercise } from "../../models/exercise.model";

export interface UserRaw{
  data: any
}

export interface MachineRaw{
  data: any
}

export interface ExerciseRaw {
  data: Data
  meta: Meta
}

export interface Data {
  id: number
  attributes: ExerciseAttributes
}
export interface ExerciseData {
  data: ExerciseAttributes;
}

export interface ExerciseAttributes {
  title: string
  subtitle: string
  description: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  user:UserRaw | number | null,
  machine: MachineRaw | number | null
}


@Injectable({
  providedIn: 'root'
})
export class ExerciseMappingStrapi implements IBaseMapping<Exercise>{

  getPaginated(page: number, pageSize: number, pages: number, data: Data[]): Paginated<Exercise> {
    return {page:page, pageSize:pageSize, pages:pages, data:data.map<Exercise>((d:Data|ExerciseRaw)=>{
      return this.getOne(d);
    })};
  }

  getOne(data: Data | ExerciseRaw): Exercise {
    const isExerciseRaw = (data: Data | ExerciseRaw): data is ExerciseRaw => 'meta' in data;

        const attributes = isExerciseRaw(data) ? data.data.attributes : data.attributes;
        const id = isExerciseRaw(data) ? data.data.id : data.id;

        return {
            id: id.toString(),
            title: attributes.title,
            subtitle: attributes.subtitle,
            description: attributes.description,
            machineName: typeof attributes.machine === 'object' ? attributes.machine?.data?.title.toString() : undefined,
            machineId: typeof attributes.machine === 'object' ? attributes.machine?.data?.id.toString() : undefined,
            userId: typeof attributes.user === 'object' ? attributes.user?.data?.id.toString() : undefined,
        };
  }

  getAdded(data: ExerciseRaw): Exercise {
    return this.getOne(data.data);
  }
  getUpdated(data: ExerciseRaw): Exercise {
    return this.getOne(data.data);
  }
  getDeleted(data: ExerciseRaw): Exercise {
    return this.getOne(data.data);
  }


  setAdd(data: Exercise) {
    return {
      data:{
          title:data.title,
          subtitle:data.subtitle,
          description:data.description,
          user:data.userId?Number(data.userId):null,
          machine: data.machineId?Number(data.machineId):null
      }
  };
  }
  setUpdate(data: any) {
    const mappedData: Partial<ExerciseAttributes> = {};

        Object.keys(data).forEach(key => {
            switch(key){
                case 'title': mappedData.title = data[key];
                break;
                case 'subtitle': mappedData.subtitle = data[key];
                break;
                case 'description': mappedData.description = data[key];
                break;
                case 'machine': mappedData.machine = data[key] ? Number(data[key]) : null;
                break;
                case 'userId': mappedData.user = data[key] ? Number(data[key]) : null;
                break;
            }
        });

        return {
            data: mappedData as ExerciseAttributes
        };
  }

}
