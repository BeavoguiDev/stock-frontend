import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth'; // adapte le chemin
import { toast } from 'ngx-sonner'; // ou ton lib de toast
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar-navbar.html',
  styleUrls: ['./sidebar-navbar.css']
})
export class SidebarNavbar implements OnInit {
  activeItem = 'Inventory';
  user: any = null;
  constructor(private authService: AuthService, private router: Router) {}  

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (res) => {
        console.log('Utilisateur récupéré:', res);
        this.user = res;
      },
      error: (err) => {
        console.warn('Pas d’utilisateur connecté', err);
        this.user = null;
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('user');
        toast.success('Déconnexion réussie ✅');
        this.router.navigate(['/login']);
      },
      error: () => {
        toast.warning('Erreur lors de la déconnexion');
      }
    });
  }

  
}
