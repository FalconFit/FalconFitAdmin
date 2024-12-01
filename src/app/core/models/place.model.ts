import { Model } from "./base.model";

export interface Place extends Model {
  title:string,
  description: string,
  lat: number,
  lng: number,
}
