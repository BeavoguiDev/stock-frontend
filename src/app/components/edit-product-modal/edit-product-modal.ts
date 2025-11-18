import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, Supplier } from '../../Model/model';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { toast } from 'ngx-sonner'; // ✅ tu peux utiliser ngx-sonner au lieu de ngx-toastr

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product-modal.html',
  styleUrls: ['./edit-product-modal.css']
})
export class EditProductModal implements OnChanges, OnInit {
  @Input() product!: Product;
  @Input() categories: { id: number; name: string }[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() updateProduct = new EventEmitter<FormData>();

  suppliers: Supplier[] = []; // ✅ liste des fournisseurs
  formData!: Product;
  imageFile: File | null = null;

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.formData = { ...this.product };
    }
  }

  ngOnInit(): void {
    // ✅ Charger les fournisseurs au montage du composant
    this.supplierService.getSuppliers().subscribe({
      next: (response) => this.suppliers = response.data,
      error: (err) => console.error('Erreur chargement fournisseurs', err)
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.imageFile = input.files[0];
    }
  }

  submit(): void {
    const data = new FormData();

    data.append('name', this.formData.name);
    data.append('category_id', this.formData.category_id.toString());
    data.append('supplier_id', (this.formData.supplier_id ?? '').toString());
    data.append('buying_price', this.formData.buying_price.toString());
    data.append('selling_price', this.formData.selling_price.toString());
    data.append('quantity', this.formData.quantity.toString());
    data.append('threshold', this.formData.threshold.toString());
    data.append('expiry_date', this.formData.expiry_date || '');

    if (this.imageFile) {
      data.append('image', this.imageFile);
    }

    data.append('_method', 'PUT');
    this.updateProduct.emit(data);
  }

  close(): void {
    this.closeModal.emit();
  }

  getProductImage(product: Product | null): string {
    if (product?.image) {
      return `http://127.0.0.1:8000/storage/${product.image}`;
    }
    return 'assets/no-image.png';
  }
}
