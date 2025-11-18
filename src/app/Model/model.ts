// src/app/Model/model.ts

export interface Category {
  id: number;
  name: string;
  description:string;
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
  created_at?: string; 
  updated_at?: string; 
  supplier?: Supplier;
  
}

export interface Supplier {
  id?: number;
  name: string;
  email: string;
  phone: string;
  takes_back_returns: boolean;
  created_at?: string;
  updated_at?: string;
  products?: any[];
}

