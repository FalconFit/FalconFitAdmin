import { Observable } from "rxjs";
import { IAuthentication } from "../../services/interfaces/authentication.interface";

export interface IStrapiAuthentication extends IAuthentication{
    getToken():string | null;
}
