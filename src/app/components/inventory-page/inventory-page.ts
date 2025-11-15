import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductModal } from '../add-product-modal/add-product-modal';
import { DetailProductModal } from '../detail-product-modal/detail-product-modal';
import { EditProductModal } from '../edit-product-modal/edit-product-modal'; // ✅ à ajouter
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddProductModal,
    DetailProductModal,
    EditProductModal // ✅ à inclure
  ],
  templateUrl: './inventory-page.html',
  styleUrls: ['./inventory-page.css']
})
export class InventoryPage implements OnInit {
  products: Product[] = [];
  categories: { id: number; name: string }[] = [];
  currentPage = 1;
  totalPages = 1;
  searchTerm = '';
  selectedCategory: number | null = null;
  itemsPerPage = 5;
  isLoading = false;

  // Modals
  showModal = false;
  showDetailModal = false;
  showEditModal = false;

  selectedProduct: Product | null = null;
  productToEdit: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (cats) => (this.categories = cats),
      error: (err) => console.error('Erreur chargement catégories', err)
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService
      .getProducts(this.currentPage, this.itemsPerPage, this.searchTerm, this.selectedCategory)
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.totalPages = res.last_page;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des produits :', err);
          this.isLoading = false;
        }
      });
  }

  onCategoryChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  onPerPageChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  getAvailability(product: Product): string {
    if (product.quantity === 0) return 'Rupture';
    if (product.quantity <= product.threshold) return 'Stock faible';
    return 'En stock';
  }

  getAvailabilityClass(product: Product): string {
    if (product.quantity === 0) return 'out-stock';
    if (product.quantity <= product.threshold) return 'low-stock';
    return 'in-stock';
  }

  getProductImage(product: Product): string {
    if (product.image) {
      return `http://127.0.0.1:8000/storage/${product.image}`;
    }
    return 'assets/AI.jpg';
  }

  getCategoryName(id: number | undefined): string {
    if (!id) return 'Catégorie inconnue';
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : 'Catégorie inconnue';
  }

  onProductAdded(product: Product): void {
    this.currentPage = 1;
    this.searchTerm = '';
    this.loadProducts();
  }

  // 🔍 Détail
  viewDetail(product: Product): void {
    this.selectedProduct = product;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedProduct = null;
  }

  // 📝 Édition
  editProduct(product: Product): void {
    this.productToEdit = product;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.productToEdit = null;
  }

  submitEdit(data: FormData): void {
    if (!this.productToEdit) return;

    this.productService.updateProduct(this.productToEdit.id, data).subscribe({
      next: () => {
        toast.success('Produit modifié ✅');
        this.loadProducts();
        this.closeEditModal();
      },
      error: () => {
        toast.error('Erreur lors de la modification ❌', {
          description: 'Veuillez réessayer plus tard'
        });
      }
    });
  }

  // 🗑️ Suppression
  deleteProduct(product: Product): void {
    if (confirm(`Voulez-vous vraiment supprimer ${product.name} ?`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== product.id);
          toast.success('Produit supprimé ✅', {
            description: `${product.name} a été supprimé`
          });
        },
        error: () => {
          toast.error('Erreur lors de la suppression ❌', {
            description: 'Veuillez réessayer plus tard'
          });
        }
      });
    }
  }
}
