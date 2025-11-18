import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../Model/model';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-add-supplier-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-supplier-modal.html',
  styleUrls: ['./add-supplier-modal.css']
})
export class AddSupplierModal {
  @Output() supplierAdded = new EventEmitter<Supplier>();
  @Output() closeModal = new EventEmitter<void>();

  name: string = '';
  email: string = '';
  phone: string = '';
  takesBackReturns: boolean = false;
  isLoading = false;

  constructor(private supplierService: SupplierService) {}

  addSupplier(): void {
    if (!this.name.trim() || !this.email.trim() || !this.phone.trim()) {
      toast.error('Tous les champs obligatoires doivent être remplis ❌');
      return;
    }

    this.isLoading = true;
    const newSupplier: Supplier = {
      id: 0,
      name: this.name,
      email: this.email,
      phone: this.phone,
      takes_back_returns: this.takesBackReturns
    };

    this.supplierService.addSupplier(newSupplier).subscribe({
      next: (supplier) => {
        toast.success('Fournisseur ajouté ✅');
        this.supplierAdded.emit(supplier);
        this.closeModal.emit();
        this.isLoading = false;
      },
      error: () => {
        toast.error('Erreur lors de l’ajout du fournisseur ❌');
        this.isLoading = false;
      }
    });
  }
}
