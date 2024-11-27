import { Model } from "./base.model";

export interface Machine extends Model {
  title:string,
  subtitle: string,
  description: string,
  taken: Boolean,
  picture?:{
    url:string | undefined,
    large:string | undefined,
    medium:string | undefined,
    small:string | undefined,
    thumbnail:string | undefined
  },
  exerciseId?: string
  userId?: string
}
