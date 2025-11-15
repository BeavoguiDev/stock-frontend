import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../Model/model';

@Component({
  selector: 'app-detail-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-product-modal.html',
  styleUrls: ['./detail-product-modal.css']
})

export class DetailProductModal {
  @Input() product!: Product | null;
  @Output() closeModal = new EventEmitter<void>();
  @Input() categoryName!: string; 
  
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
