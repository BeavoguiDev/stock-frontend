import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // 🔐 Inscription
  register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.http.post(`${this.API_URL}/api/register`, data);
  }

  // 🔐 Connexion
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/api/login`, data).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  // 🔐 Déconnexion
  logout(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.API_URL}/api/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
    );
  }

  // 👤 Récupérer l'utilisateur connecté
  getUser(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.API_URL}/api/user`, { headers });
  }

  // 🧠 Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // 🛡️ Générer les headers d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });
  }
}
