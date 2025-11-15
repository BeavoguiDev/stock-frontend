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

  getProducts(
    page: number = 1,
    perPage: number = 5,
    search: string = '',
    categoryId: number | null = null
  ): Observable<any> {
    let url = `${this.baseUrl}/products?page=${page}&per_page=${perPage}`;

    if (search && search.trim().length > 0) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }

    if (categoryId !== null && categoryId !== undefined) {
      url += `&category_id=${categoryId}`;
    }

    return this.http.get(url);
  }


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, formData);
  }
  // Pour supprimer un produit
  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/products/${id}`);
  }

  // Pour recuperer un produit
  getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  // Pour mettre à jour 
  updateProduct(id: number, data: FormData) {
  // ✅ POST avec override pour Laravel
  return this.http.post<Product>(`${this.baseUrl}/products/${id}`, data);
}



}
