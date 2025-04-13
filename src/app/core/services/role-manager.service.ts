import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManagerService {
  private readonly ROLE_KEY = 'USER_ROLE';
  private jwtHelper = new JwtHelperService();
  private roleSubject = new BehaviorSubject<string>('user');
  public role$: Observable<string> = this.roleSubject.asObservable();

  constructor() {
    this.initRole()
  }

  initRole(){
    try {
      const token = localStorage.getItem(this.ROLE_KEY);
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        const role = decodedToken?.role || 'user';
        this.roleSubject.next(role);
      } else {
        this.roleSubject.next('user');
      }
    } catch (error) {
      console.error('Error initializing role', error);
      this.roleSubject.next('user');
    }
  }

  setRole(token: string): void {
    try {
      localStorage.setItem(this.ROLE_KEY, token);

      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken?.role || 'user';

      this.roleSubject.next(role);
    } catch (error) {
      console.error('Error setting role from token', error);
      this.roleSubject.next('user');
    }
  }

  getCurrentRoleValue(): string {
    return this.roleSubject.value;
  }
}
