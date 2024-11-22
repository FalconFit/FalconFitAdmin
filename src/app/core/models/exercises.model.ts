import { Model } from "./base.model";

export interface Exercises extends Model{
  title: string,
  subtitle: string,
  photo?:{
    url:string | undefined,
    large:string | undefined,
    medium:string | undefined,
    small:string | undefined,
    thumbnail:string | undefined
  },
  machineId?: string,
  supersetId?: string,
  userffId?: string
}
