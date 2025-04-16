import { IBaseMapping } from './../interfaces/base-mapping.interface';
import { Injectable } from "@angular/core";
import { Paginated } from "../../models/paginated.model";
import { StrapiMedia } from "../../services/impl/strapi-media.service";
import { Userff } from '../../models/userff.model';


export interface MediaRaw{
    data: StrapiMedia
}
export interface UserRaw{
    data: any
}
export interface GroupRaw{
    data: any
}

export interface PersonRaw {
    data: Data
    meta: Meta
  }

export interface Data {
    id: number
    attributes: PersonAttributes
}
export interface PersonData {
    data: PersonAttributes;
}

export interface PersonAttributes {
    name: string
    surname: string
    email: string
    phoneNumber: string
    registerDate: string
    birthdate?: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
    user:UserRaw | number | null,
    picture:MediaRaw | number | null,
    role: string
}

export interface GroupAttributes {
    name: string
}

export interface Meta {}

@Injectable({
    providedIn: 'root'
  })
  export class UserffMappingStrapi implements IBaseMapping<Userff> {
    setAdd(data: Userff):PersonData {
        return {
            data:{
              name: data.name,
              surname: data.surname,
              phoneNumber: data.phoneNumber || 'Vacio',
              user: data.uuid ? Number(data.uuid) : null,
              picture: data.picture ? Number(data.picture) : null,
              role: data.role,
              email: data.email,
              registerDate: data.registerDate
            }
        };
    }
    setUpdate(data: Partial<Userff>): PersonData {
        const mappedData: Partial<PersonAttributes> = {};

        Object.keys(data).forEach(key => {
            switch(key){
                case 'name': mappedData.name = data[key];
                break;
                case 'surname': mappedData.surname = data[key];
                break;
                case 'userId': mappedData.user = data[key] ? Number(data[key]) : null;
                break;
                case 'picture': mappedData.picture = data[key] ? Number(data[key]) : null;
                break;
            }
        });

        return {
            data: mappedData as PersonAttributes
        };
    }

    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Userff> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Userff>((d:Data|PersonRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: Data | PersonRaw): Userff {
        const isPersonRaw = (data: Data | PersonRaw): data is PersonRaw => 'meta' in data;

        const attributes = isPersonRaw(data) ? data.data.attributes : data.attributes;
        const id = isPersonRaw(data) ? data.data.id : data.id;

        return {
            id: id.toString(),
            name: attributes.name,
            surname: attributes.surname,
            email: attributes.email,
            registerDate: attributes.registerDate,
            phoneNumber: attributes.phoneNumber,
            uuid: typeof attributes.user === 'object' ? attributes.user?.data?.id.toString() : undefined,
            picture: typeof attributes.picture === 'object' ? {
                url: attributes.picture?.data?.attributes?.url,
                large: attributes.picture?.data?.attributes?.formats?.large?.url || attributes.picture?.data?.attributes?.url,
                medium: attributes.picture?.data?.attributes?.formats?.medium?.url || attributes.picture?.data?.attributes?.url,
                small: attributes.picture?.data?.attributes?.formats?.small?.url || attributes.picture?.data?.attributes?.url,
                thumbnail: attributes.picture?.data?.attributes?.formats?.thumbnail?.url || attributes.picture?.data?.attributes?.url,
            } : undefined,
            role: attributes.role
        };
    }
    getAdded(data: PersonRaw):Userff {
        return this.getOne(data.data);
    }
    getUpdated(data: PersonRaw):Userff {
        return this.getOne(data.data);
    }
    getDeleted(data: PersonRaw):Userff {
        return this.getOne(data.data);
    }
  }
