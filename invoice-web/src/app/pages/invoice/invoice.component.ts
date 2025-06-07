import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceDetailToSave, InvoiceToSave } from '../../core/models/invoice';
import { CustomerDto, CustomerService } from '../../services/customer-service.service';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);
  private invoiceService = inject(InvoiceService);

  isModalOpen = false;
  isEditMode = false;

  customers: CustomerDto[] = [];
  currentCustomer: CustomerDto | null = null;
  
  form = this.fb.group({
    customerId: [0, Validators.required],
    invoiceDetails: this.fb.array<FormGroup>([])
  });

  get invoiceDetails(): FormArray {
    return this.form.get('invoiceDetails') as FormArray;
  }

  ngOnInit(): void {
    this.loadCustomers();
  }
    private loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (data) => this.customers = data,
      error: () => alert("Error al obtener clientes"),
    });
  }

  addDetail(): void {
    const detail = this.fb.group({
      productName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
    });
    this.invoiceDetails.push(detail);
  }

  removeDetail(index: number): void {
    this.invoiceDetails.removeAt(index);
  }

  calculateTotal(): number {
    return this.invoiceDetails.controls.reduce((sum, control) => {
      const qty = control.get('quantity')?.value || 0;
      const price = control.get('unitPrice')?.value || 0;
      return sum + qty * price;
    }, 0);
  }

  handleSubmit(): void {
    if (this.form.valid) {
      const payload:InvoiceToSave = {
        customerId: this.form.value.customerId as number,
        invoiceDetails: this.invoiceDetails.getRawValue()
      }

      this.invoiceService.create(payload).subscribe({
        next: () => {
          alert('Factura creada correctamente');
          this.form.reset();
          this.invoiceDetails.clear();
        },
        error: () => alert('Error al crear factura')
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  
  openToEdit(customer:CustomerDto){
    this.currentCustomer = customer;
    this.isEditMode = true;
    this.isModalOpen = true;
    this.form.patchValue({customerId:customer.customerId})
  }
}
