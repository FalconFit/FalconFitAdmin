import { Injectable } from "@angular/core";
import { Machine } from "../../models/machine.model";
import { Paginated } from "../../models/Paginated.model";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Meta } from "@angular/platform-browser";
import { StrapiMedia } from "../../services/impl/strapi-media.service";
import { Place } from '../../models/place.model';


export interface PlaceRaw {
  data: Data
  meta: Meta
}

export interface Data {
  id: number
  attributes: PlaceAttributes
}
export interface PlaceData {
  data: PlaceAttributes;
}

export interface PlaceAttributes {
  title: string
  description: string
  latitud: Number
  longitud: Number
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}


@Injectable({
  providedIn: 'root'
})
export class PlaceMappingStrapi implements IBaseMapping<Place>{

  getPaginated(page: number, pageSize: number, pages: number, data: Data[]): Paginated<Place> {
    return {page:page, pageSize:pageSize, pages:pages, data:data.map<Place>((d:Data|PlaceRaw)=>{
      return this.getOne(d);
    })};
  }

  getOne(data: Data | PlaceRaw): Place {
    const isplaceRaw = (data: Data | PlaceRaw): data is PlaceRaw => 'meta' in data;

        const attributes = isplaceRaw(data) ? data.data.attributes : data.attributes;
        const id = isplaceRaw(data) ? data.data.id : data.id;

        return {
            id: id.toString(),
            title: attributes.title,
            description: attributes.description,
            latitud: attributes.latitud,
            longitud: attributes.longitud
        };
  }

  getAdded(data: PlaceRaw): Place {
    return this.getOne(data.data);
  }
  getUpdated(data: PlaceRaw): Place {
    return this.getOne(data.data);
  }
  getDeleted(data: PlaceRaw): Place {
    return this.getOne(data.data);
  }


  setAdd(data: Place): PlaceData {
    return {
      data:{
        title: data.title,
        description: data.description,
        latitud: data.latitud,
        longitud: data.longitud
      }
  };
  }
  setUpdate(data: any): PlaceData {
    const mappedData: Partial<PlaceAttributes> = {};
        Object.keys(data).forEach(key => {
            switch(key){
                case 'title': mappedData.title = data[key];
                break;
                case 'description': mappedData.description = data[key];
                break;
            }
        });

        return {
            data: mappedData as PlaceAttributes
        };
  }

}
