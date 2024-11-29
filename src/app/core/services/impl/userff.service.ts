// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { IUserffService } from '../interfaces/userff-service.interface';
import { Userff } from '../../models/userff.model';
import { USERFF_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IUserffRepository } from '../../repositories/interfaces/userff-repository.interface';
import { map, Observable } from 'rxjs';

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
}
