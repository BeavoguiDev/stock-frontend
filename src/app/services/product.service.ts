import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product } from '../Model/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // 📄 Liste des produits avec pagination et filtres
  getProducts(
    page: number = 1,
    perPage: number = 5,
    search: string = '',
    categoryId: number | null = null
  ): Observable<any> {
    let url = `${this.baseUrl}/products?page=${page}&per_page=${perPage}`;

    if (search.trim().length > 0) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }

    if (categoryId !== null) {
      url += `&category_id=${categoryId}`;
    }

    return this.http.get(url);
  }

  // ➕ Ajouter un produit
  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, formData);
  }

  // 🗑️ Supprimer un produit
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }

  // 📄 Récupérer un produit par ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  // Pour mettre à jour 
  updateProduct(id: number, data: FormData) {
    // ✅ POST avec override pour Laravel
    return this.http.post<Product>(`${this.baseUrl}/products/${id}`, data);
  }

  // 📄 Liste des catégories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  // 📄 Récupérer une catégorie par ID
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  // ➕ Créer une catégorie
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, category);
  }

  // ✏️ Mettre à jour une catégorie
  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${id}`, category);
  }

  // 🗑️ Supprimer une catégorie
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
  }
}
