import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { toast } from 'ngx-sonner'; // ✅ import direct

@Component({
  selector: 'app-page-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './page-login.html',
  styleUrls: ['./page-login.css']
})
export class PageLogin implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = {
        email: this.email?.value,
        password: this.password?.value
      };

      this.authService.login(formData).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          toast.success('Connexion réussie ✅', {
            description: 'Bienvenue ' + res.user.name,
            duration: 3000
          });
          this.router.navigate(['/inventory']);
        },
        error: (err) => {
          let message = 'Erreur de connexion';
          if (err.status === 401) {
            message = err.error?.message || 'Identifiants incorrects';
          } else if (err.status === 500) {
            message = 'Erreur interne du serveur';
          }
          toast.error(message, { description: 'Connexion échouée', duration: 3000 });
        }

      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goToSignup() {
    this.router.navigate(['/register']);
  }

  signInWithGoogle() {
    console.log('Google login ');
    toast.warning('Connexion avec Google en cours...', {
      description: 'Option momentanement indisponible',
      duration: 5000
    });
    // Intégration OAuth à venir
  }
}
