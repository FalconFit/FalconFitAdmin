// src/app/core/services/role-manager.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleManagerService {
  private readonly ROLE_KEY = 'USER_ROLE';

  constructor() { }

  initRole(){
    const saveRole = localStorage.getItem(this.ROLE_KEY) || 'user';
    this.setRole(saveRole)
  }

  setRole(role: string): void {
    localStorage.setItem(this.ROLE_KEY, role)
    console.log(`Role updated to: ${role}`);
  }

  getCurrentRoleValue(): string {
    return localStorage.getItem(this.ROLE_KEY) || 'user'
  }
}
