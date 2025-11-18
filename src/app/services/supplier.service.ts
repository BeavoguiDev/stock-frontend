import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../Model/model';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // 📄 Liste des fournisseurs
  getSuppliers(page: number = 1, perPage: number = 5): Observable<PaginatedResponse<Supplier>> {
    return this.http.get<PaginatedResponse<Supplier>>(
      `${this.baseUrl}/suppliers?page=${page}&per_page=${perPage}`
    );
  }

  // 📄 Détail d’un fournisseur
  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseUrl}/suppliers/${id}`);
  }

  // ➕ Création d’un fournisseur
  addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.baseUrl}/suppliers`, supplier);
  }

  // ✏️ Mise à jour d’un fournisseur
  updateSupplier(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.baseUrl}/suppliers/${id}`, supplier);
  }

  // 🗑️ Suppression d’un fournisseur
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/suppliers/${id}`);
  }
}
