import { Model } from "./base.model";

export interface Place extends Model {
  title:string,
  description: string,
  latitud: Number,
  longitud: Number,
}
