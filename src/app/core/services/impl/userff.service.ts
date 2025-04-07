// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { IUserffService } from '../interfaces/userff-service.interface';
import { Userff } from '../../models/userff.model';
import { USERFF_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IUserffRepository } from '../../repositories/interfaces/userff-repository.interface';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserffService extends BaseService<Userff> implements IUserffService {
  constructor(
    @Inject(USERFF_REPOSITORY_TOKEN) repository: IUserffRepository
  ) {
    super(repository);
  }

  getByUserId(userId: string): Observable<Userff | null> {
    return this.repository.getAll(1, 1, {user: userId}).pipe(
      map(res => Array.isArray(res) ? res[0] || null : res.data[0] || null)
    );
  }

  getByUuid(uuid: string): Observable<Userff | null> {
    // Usar un filtro para buscar por uuid
    return this.repository.getAll(1, 1, { uuid: uuid }).pipe(
      map(res => {
        // Manejar tanto un array como un objeto paginado
        if (Array.isArray(res)) {
          return res[0] || null;
        } else if (res && res.data) {
          return res.data[0] || null;
        }
        return null;
      })
    );
  }
}
