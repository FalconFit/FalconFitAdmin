import { Machine } from "../../models/machine.model";
import { IBaseService } from "./base-service.interface";
import { User } from '../../models/auth.model';

export interface IMachineService extends IBaseService<Machine>{
}
