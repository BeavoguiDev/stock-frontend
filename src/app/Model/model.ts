// src/app/Model/model.ts

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  buying_price: number;
  selling_price: number;
  quantity: number;
  threshold: number;
  expiry_date: string;
  supplier_id?: number;
  category?: Category;
  image?: string;
  created_at?: string; // ✅ ajout
  updated_at?: string; // ✅ ajout
  
}
