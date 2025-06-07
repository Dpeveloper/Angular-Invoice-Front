import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService, CustomerDto, CustomerToSaveDto } from '../../services/customer-service.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  private customerService = inject(CustomerService);

  customers: CustomerDto[] = [];
  currentCustomer: CustomerDto | null = null;

  isModalOpen = false;
  isEditMode = false;

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    customerNumber: new FormControl(0, [Validators.required, Validators.min(1)]),
    location: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (data) => this.customers = data,
      error: () => alert("Error al obtener clientes"),
    });
  }

  openModalToCreate(): void {
    this.isEditMode = false;
    this.isModalOpen = true;
    this.profileForm.reset();
  }

  openModalToEdit(customer: CustomerDto): void {
    this.currentCustomer = customer;
    this.isEditMode = true;
    this.isModalOpen = true;
    this.profileForm.patchValue({
      name: customer.name,
      customerNumber: customer.customerNumber,
      location: customer.location
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentCustomer = null;
    this.profileForm.reset();
  }

  saveCustomer(): void {
    if (!this.profileForm.valid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const payload: CustomerToSaveDto = {
      name: this.profileForm.value.name ?? '',
      customerNumber: this.profileForm.value.customerNumber ?? 0,
      location: this.profileForm.value.location ?? '',
    };

    if (this.isEditMode && this.currentCustomer) {
      this.customerService.update(this.currentCustomer.customerId, payload).subscribe({
        next: () => {
          alert("Cliente editado exitosamente");
          this.closeModal();
          this.loadCustomers();
        },
        error: () => alert("Error al editar cliente")
      });
    } else {
      this.customerService.create(payload).subscribe({
        next: () => {
          alert("Cliente creado exitosamente");
          this.closeModal();
          this.loadCustomers();
        },
        error: () => alert("Error al crear cliente")
      });
    }
  }

  deleteCustomer(customer: CustomerDto): void {
    const confirmed = confirm(`¿Seguro que deseas eliminar a "${customer.name}"?`);
    if (!confirmed) return;

    this.customerService.delete(customer.customerId).subscribe({
      next: () => {
        alert("Cliente eliminado exitosamente");
        this.loadCustomers();
      },
      error: (e) => alert(e.message)
    });
  }
}
