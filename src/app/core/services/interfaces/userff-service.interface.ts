// src/app/services/interfaces/people.service.interface.ts
import { Observable } from 'rxjs';
import { Userff } from '../../models/userff.model';
import { IBaseService } from './base-service.interface';

export interface IUserffService extends IBaseService<Userff> {
  getByUserId(userId: string): Observable<Userff | null>;
}
