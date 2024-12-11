import { Model } from "./base.model";

export interface Exercise extends Model{
  title: string,
  subtitle: string,
  description: string,
  machine?: string,
  machineId?: string,
  userId?: string
}
