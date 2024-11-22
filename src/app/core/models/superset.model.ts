import { Model } from "./base.model";

export interface Superset extends Model {
  title: String,
  userffId?: String,
  exerciseId?: String
}
