import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8000'; 

  constructor(private http: HttpClient) {}

  register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.http.get(`${this.API_URL}/sanctum/csrf-cookie`, { withCredentials: true }).pipe(
      switchMap(() =>
        this.http.post(`${this.API_URL}/api/inscription`, data, { withCredentials: true })
      )
    );
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.get(`${this.API_URL}/sanctum/csrf-cookie`, { withCredentials: true }).pipe(
      switchMap(() =>
        this.http.post(`${this.API_URL}/api/connexion`, data, { withCredentials: true })
      )
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/api/deconnexion`, {}, { withCredentials: true });
  }

  // 👉 Nouvelle méthode pour récupérer l’utilisateur connecté
  getUser(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/user`, { withCredentials: true });
  }
}
