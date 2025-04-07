// src/app/core/services/role-manager.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  // This makes it a singleton service available throughout the app
})
export class RoleManagerService {
  // BehaviorSubject maintains the current value and emits it to new subscribers
  private _currentRole = new BehaviorSubject<string | null>(null);

  // Expose the role as an observable (read-only)
  public readonly currentRole$ = this._currentRole.asObservable();

  constructor() { }

  // Method to update the role
  setRole(role: string): void {
    this._currentRole.next(role);
    console.log(`Role updated to: ${role}`);
  }

  // Clear the role (e.g., on logout)
  clearRole(): void {
    this._currentRole.next(null);
  }

  // Convenience methods to check specific roles
  isGestor(): Observable<boolean> {
    return this.currentRole$.pipe(
      map(role => role === 'gestor')
    );
  }

  isUser(): Observable<boolean> {
    return this.currentRole$.pipe(
      map(role => role === 'user')
    );
  }

  // Get current role value synchronously (when you can't use observables)
  getCurrentRoleValue(): string | null {
    return this._currentRole.getValue();
  }
}
