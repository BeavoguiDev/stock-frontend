import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Category, Product } from '../../Model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner';


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
  formData: Partial<Product> = {
    name: '',
    category_id: 0,
    buying_price: 0,
    selling_price: 0,
    quantity: 0,
    threshold: 0,
    expiry_date: ''
    
  };

  errors: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Erreur chargement catégories', err)
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
