import { Model } from "./base.model";

export interface Workout extends Model{
  name: String,
  description: String,
  machineIds: String
}
