import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';
import { HttpClientModule } from '@angular/common/http';
import { NgxSonnerToaster } from 'ngx-sonner';
import { SidebarNavbar } from './components/sidebar-navbar/sidebar-navbar';

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

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTest().subscribe({
      next: (data) => {
        console.log('Réponse du serveur Laravel :', data);
        this.message = data.message;
      },
      error: (err) => {
        console.error('Erreur de connexion au backend :', err);
      }
    });
  }
  
}

