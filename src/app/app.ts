import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';
import { HttpClientModule } from '@angular/common/http';
import { NgxSonnerToaster } from 'ngx-sonner';

// 🔹 Ajout des services d’authentification et d’inactivité
import { AuthService } from './services/auth';
import { IdleService } from './services/idle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgxSonnerToaster],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('stock-frontend');
  message = '';

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private idleService: IdleService
  ) {}

  ngOnInit() {
    // ✅ Test API Laravel
    this.api.getTest().subscribe({
      next: (data) => {
        console.log('Réponse du serveur Laravel :', data);
        this.message = data.message;
      },
      error: (err) => {
        console.error('Erreur de connexion au backend :', err);
      }
    });

    // ✅ Démarrer la surveillance si l’utilisateur est connecté
    if (this.authService.isAuthenticated()) {
      this.idleService.startWatching();
    }
  }
}
