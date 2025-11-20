import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // ✅ Si déjà connecté, redirige vers le dashboard
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true; // ✅ Sinon, accès autorisé à la page login
  }
}
