import { Component, inject } from '@angular/core';
import { CustomerDto, CustomerService } from '../../../services/customer-service.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  imports: [ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customers:CustomerDto[] | undefined;
  profileForm = new FormGroup({
    name: new FormControl(''),
    customerNumber: new FormControl(''),
    location: new FormControl(''),
  });
  
  private customerService = inject(CustomerService)
  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (e) => {
        alert("error!");
      }
    })
  }

  handleSubmit() {
    alert(this.profileForm.value.name + ' | ' + this.profileForm.value.location);
  }
}
