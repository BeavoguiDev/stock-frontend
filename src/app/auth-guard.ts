import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Vérifie si l'utilisateur est connecté
    const isLoggedIn = !!localStorage.getItem('user');

    if (!isLoggedIn) {
      // Si non connecté → redirection vers la page de connexion
      this.router.navigate(['/connexion']);
      return false;
    }

    // Si connecté → accès autorisé
    return true;
  }
}
