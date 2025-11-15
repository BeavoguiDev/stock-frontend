import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../Model/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product-modal.html',
  styleUrls: ['./edit-product-modal.css']
})
export class EditProductModal {
  @Input() product!: Product;
  @Input() categories: { id: number; name: string }[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() updateProduct = new EventEmitter<FormData>();

  formData: Product = { ...this.product };
  imageFile: File | null = null;

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
    data.append('buying_price', this.formData.buying_price.toString());
    data.append('selling_price', this.formData.selling_price.toString());
    data.append('quantity', this.formData.quantity.toString());
    data.append('threshold', this.formData.threshold.toString());
    data.append('expiry_date', this.formData.expiry_date || '');

    if (this.imageFile) {
      data.append('image', this.imageFile);
    }

    this.updateProduct.emit(data);
  }



  close(): void {
    this.closeModal.emit();
  }

  getProductImage(product: Product | null): string {
  if (product?.image) {
    return `http://127.0.0.1:8000/storage/${product.image}`;
  }
  return 'assets/no-image.png'; // fallback
}

}
