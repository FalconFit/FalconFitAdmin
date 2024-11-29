import { Injectable } from "@angular/core";
import { Machine } from "../../models/machine.model";
import { Paginated } from "../../models/Paginated.model";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Meta } from "@angular/platform-browser";
import { StrapiMedia } from "../../services/impl/strapi-media.service";

export interface UserRaw{
  data: any
}
export interface MediaRaw{
  data: StrapiMedia
}
export interface MachineRaw {
  data: Data
  meta: Meta
}

export interface Data {
  id: number
  attributes: MachineAttributes
}
export interface MachineData {
  data: MachineAttributes;
}

export interface MachineAttributes {
  title: string
  subtitle: string
  description: string
  taken: boolean
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  user:UserRaw | number | null,
  picture:MediaRaw | number | null
}


@Injectable({
  providedIn: 'root'
})
export class MachineMappingStrapi implements IBaseMapping<Machine>{

  getPaginated(page: number, pageSize: number, pages: number, data: Data[]): Paginated<Machine> {
    return {page:page, pageSize:pageSize, pages:pages, data:data.map<Machine>((d:Data|MachineRaw)=>{
      return this.getOne(d);
    })};
  }

  getOne(data: Data | MachineRaw): Machine {
    const isPersonRaw = (data: Data | MachineRaw): data is MachineRaw => 'meta' in data;

        const attributes = isPersonRaw(data) ? data.data.attributes : data.attributes;
        const id = isPersonRaw(data) ? data.data.id : data.id;

        return {
            id: id.toString(),
            title: attributes.title,
            subtitle: attributes.subtitle,
            description: attributes.description,
            taken:attributes.taken,
            userId: typeof attributes.user === 'object' ? attributes.user?.data?.id.toString() : undefined,
            picture: typeof attributes.picture === 'object' ? {
                url: attributes.picture?.data?.attributes?.url,
                large: attributes.picture?.data?.attributes?.formats?.large?.url || attributes.picture?.data?.attributes?.url,
                medium: attributes.picture?.data?.attributes?.formats?.medium?.url || attributes.picture?.data?.attributes?.url,
                small: attributes.picture?.data?.attributes?.formats?.small?.url || attributes.picture?.data?.attributes?.url,
                thumbnail: attributes.picture?.data?.attributes?.formats?.thumbnail?.url || attributes.picture?.data?.attributes?.url,
            } : undefined
        };
  }

  getAdded(data: MachineRaw): Machine {
    return this.getOne(data.data);
  }
  getUpdated(data: MachineRaw): Machine {
    return this.getOne(data.data);
  }
  getDeleted(data: MachineRaw): Machine {
    return this.getOne(data.data);
  }


  setAdd(data: Machine) {
    return {
      data:{
          title:data.title,
          subtitle:data.subtitle,
          description:data.description,
          taken:data.taken,
          user:data.userId?Number(data.userId):null,
          picture:data.picture?Number(data.picture):null
      }
  };
  }
  setUpdate(data: any) {
    const mappedData: Partial<MachineAttributes> = {};

        Object.keys(data).forEach(key => {
            switch(key){
                case 'name': mappedData.title = data[key];
                break;
                case 'surname': mappedData.subtitle = data[key];
                break;
                case 'description': mappedData.description = data[key];
                break;
                case 'taken': mappedData.taken = data[key];
                break;
                case 'userId': mappedData.user = data[key] ? Number(data[key]) : null;
                break;
                case 'picture': mappedData.picture = data[key] ? Number(data[key]) : null;
                break;
            }
        });

        return {
            data: mappedData as MachineAttributes
        };
  }

}
