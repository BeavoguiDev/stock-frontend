import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.warning('Accès refusé', {
        description: 'Veuillez vous connecter pour accéder à cette page',
        duration: 5000
      });

      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
