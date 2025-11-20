// src/app/services/idle.service.ts
import { Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class IdleService {
  private timeout: any;
  private readonly INACTIVITY_MS = 10* 60 * 1000; // 15 minutes

  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  startWatching(): void {
    this.resetTimer();
    window.addEventListener('mousemove', this.resetTimer.bind(this));
    window.addEventListener('keydown', this.resetTimer.bind(this));
    window.addEventListener('click', this.resetTimer.bind(this));
  }

  private resetTimer(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.authService.logout().subscribe({
        next: () => {
          console.log('Déconnecté pour inactivité');
          this.router.navigate(['/login']); // ✅ redirection immédiate
        },
        error: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['/login']); // ✅ même en cas d’erreur API
        }
      });
    }, this.INACTIVITY_MS);
  }
}
