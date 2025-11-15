import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-page-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './page-inscription.html',
  styleUrls: ['./page-inscription.css']
})
export class PageInscription implements OnInit {
  signupForm!: FormGroup;

  constructor(
  private fb: FormBuilder,
  private router: Router,
  private authService: AuthService
  
) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Validation
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get name() {
    return this.signupForm.get('name')!;
  }
  get email() {
    return this.signupForm.get('email')!;
  }
  get password() {
    return this.signupForm.get('password')!;
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword')!;
  }

  onSubmit() {
  if (this.signupForm.valid) {
    const formData = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      password_confirmation: this.confirmPassword.value
    };

    this.authService.register(formData).subscribe({
      next: (res) => {
        toast.success('Inscription réussie 🎉', {
          description: 'Bienvenue ' + res.user.name,
          duration: 3000
        });
        console.log('Inscription réussie :', res);
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        const message = err.error?.message || 'Erreur lors de l’inscription';
        toast.error(message, {
          description: 'Vérifie les champs',
          duration: 3000
        });
      }

    });
  } else {
    this.signupForm.markAllAsTouched();
  }
}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  signInWithGoogle() {
    console.log('Google signup');
    toast.warning('Connexion avec Google en cours...', {
      description: 'Option momentanement indisponible',
      duration: 5000
    });
    // Intégration Google OAuth 
  }
}
