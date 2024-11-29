import { Machine } from './../../models/machine.model';
import { Injectable } from "@angular/core";
import { Paginated } from "../../models/Paginated.model";
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { take } from 'rxjs';

interface MachineRaw{
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
  export class MachineLocalStorageMapping implements IBaseMapping<Machine> {
    setAdd(data: Machine) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize:number, pages:number, data: MachineRaw[]): Paginated<Machine> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Machine>((d:MachineRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: MachineRaw):Machine {
        return {
            id:data.id,
            title:data.name.first,
            subtitle:data.name.last,
            description:data.description,
            taken:data.taken,
            picture:{
                url:data.photo.url,
                large:data.photo.large,
                medium:data.photo.medium,
                small:data.photo.small,
                thumbnail:data.photo.thumbnail
            }};
    }
    getAdded(data: MachineRaw):Machine {
        return this.getOne(data);
    }
    getUpdated(data: MachineRaw):Machine {
        return this.getOne(data);
    }
    getDeleted(data: MachineRaw):Machine {
        return this.getOne(data);
    }
  }
