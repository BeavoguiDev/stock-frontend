import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../Model/model';
import { FormsModule } from '@angular/forms';
//import { AddSupplierModal } from '../add-supplier-modal/add-supplier-modal';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suppliers.html',
  styleUrls: ['./suppliers.css']
})
export class Suppliers implements OnInit {
  suppliers: Supplier[] = [];
  showModal = false;
  isLoading = false;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.isLoading = true;
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.isLoading = false;
      },
      error: () => {
        toast.error('Erreur chargement fournisseurs ❌');
        this.isLoading = false;
      }
    });
  }

  onSupplierAdded(supplier: Supplier): void {
    this.suppliers.unshift(supplier); // Ajout en haut de la liste
    this.showModal = false;
    toast.success('Fournisseur ajouté ✅');
  }
}
