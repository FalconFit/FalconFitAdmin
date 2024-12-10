import { Model } from "./base.model";

export interface Exercise extends Model{
  title: string,
  subtitle: string,
  description: string,
  machineName?: string,
  machineId?: string,
  userId?: string
}
