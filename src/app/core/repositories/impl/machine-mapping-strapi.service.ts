import { Injectable } from "@angular/core";
import { Machine } from "../../models/machine.model";
import { Paginated } from "../../models/paginated.model";
import { IBaseMapping } from "../interfaces/base-mapping.interface";

@Injectable({
  providedIn: 'root'
})
export class MachineMappingStrapi implements IBaseMapping<Machine>{

  getPaginated(page: number, pageSize: number, pages: number, data: any): Paginated<Machine> {
    throw new Error("Method not implemented.");
  }
  getOne(data: any): Machine {
    throw new Error("Method not implemented.");
  }
  getAdded(data: any): Machine {
    throw new Error("Method not implemented.");
  }
  getUpdated(data: any): Machine {
    throw new Error("Method not implemented.");
  }
  getDeleted(data: any): Machine {
    throw new Error("Method not implemented.");
  }
  setAdd(data: Machine) {
    throw new Error("Method not implemented.");
  }
  setUpdate(data: any) {
    throw new Error("Method not implemented.");
  }

}
