import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Category } from '../../Model/model';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-add-category-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category-modal.html',
  styleUrls: ['./add-category-modal.css']
})
export class AddCategoryModal {
  @Output() categoryAdded = new EventEmitter<Category>();
  @Output() closeModal = new EventEmitter<void>();

  name: string = '';
  description: string = '';
  isLoading = false;

  constructor(private productService: ProductService) {}

  addCategory(): void {
    if (!this.name.trim()) {
      toast.error('Le nom de la catégorie est obligatoire ❌');
      return;
    }

    this.isLoading = true;
    const newCategory: Category = {
      id: 0,
      name: this.name,
      description: this.description
    };

    this.productService.addCategory(newCategory).subscribe({
      next: (category) => {
        toast.success('Catégorie ajoutée ✅');
        this.categoryAdded.emit(category);
        this.closeModal.emit();
        this.isLoading = false;
      },
      error: () => {
        toast.error('Erreur lors de l’ajout de la catégorie ❌');
        this.isLoading = false;
      }
    });
  }
}
