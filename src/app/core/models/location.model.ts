import { Model } from "./base.model";

export interface Location extends Model {
  title:string,
  description: string,
  lat: number,
  lng: number,
}
