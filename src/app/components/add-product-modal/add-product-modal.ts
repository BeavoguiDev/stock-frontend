import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Category, Product, Supplier } from '../../Model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { Suppliers } from '../suppliers/suppliers';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  templateUrl: './add-product-modal.html',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./add-product-modal.css']
})
export class AddProductModal implements OnInit {
  @Output() productAdded = new EventEmitter<Product>();
  @Output() closeModal = new EventEmitter<void>();

  categories: Category[] = [];
  suppliers: Supplier[] = [];

  formData: Partial<Product> = {
    name: '',
    category_id: 0,
    supplier_id: 0,
    buying_price: 0,
    selling_price: 0,
    quantity: 0,
    threshold: 0,
    expiry_date: ''
    
  };

  errors: string[] = [];

  constructor(private productService: ProductService, private supplierService: SupplierService) {}

  ngOnInit(): void {
  // Charger les catégories
  this.productService.getCategories().subscribe({
    next: (response) => {
      this.categories = response; // ✅ liste simple
    },
    error: (err) => console.error('Erreur chargement catégories', err)
  });

  // Charger les fournisseurs
  this.supplierService.getSuppliers().subscribe({
    next: (response) => {
      this.suppliers = response.data; // ✅ pagination Laravel
    },
    error: (err) => console.error('Erreur chargement fournisseurs', err)
  });
}

  // Pour Gérer les images
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submit(): void {
  this.errors = [];

  const formDataToSend = new FormData();
  Object.entries(this.formData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formDataToSend.append(key, value as any);
    }
  });

  if (this.selectedFile) {
    formDataToSend.append('image', this.selectedFile); 
  }

  this.productService.addProduct(formDataToSend).subscribe({
    next: (product) => {
      this.productAdded.emit(product);
      this.closeModal.emit();
      toast.success('Produit ajouté avec succès ✅', {
        description: 'Le produit est maintenant visible dans la liste',
      });
    },
    error: (err) => {
      this.errors = ['Erreur : Ajout impossible, veuillez remplir les champs'];
    }
  });
}

}
