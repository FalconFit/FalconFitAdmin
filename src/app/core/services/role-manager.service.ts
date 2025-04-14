import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManagerService {
  private readonly ROLE_KEY = 'USER_ROLE';
  private roleSubject = new BehaviorSubject<string>('user');
  public role$: Observable<string> = this.roleSubject.asObservable();

  constructor() {
    this.initRole()
  }

  initRole(){
    try {
      const token = localStorage.getItem(this.ROLE_KEY);
      if (token) {
        this.roleSubject.next(token);
      } else {
        this.roleSubject.next('user');
      }
    } catch (error) {
      console.error('Error initializing role', error);
      this.roleSubject.next('user');
    }
  }

  setRole(role?: string): void {
    try {
      localStorage.setItem(this.ROLE_KEY, role || 'user');

      this.roleSubject.next(role || 'user');
    } catch (error) {
      console.error('Error setting role from token', error);
      this.roleSubject.next('user');
    }
  }

  getCurrentRoleValue(): string {
    return this.roleSubject.value;
  }
}
