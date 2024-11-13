import { Model } from './base.model';

export interface Machine extends Model{
  name: String
  descripton: String,
  taken: Boolean
}
