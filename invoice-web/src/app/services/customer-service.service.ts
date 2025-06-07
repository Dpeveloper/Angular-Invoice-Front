import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface InvoiceDto {
  invoiceId: number;
  date: string;
  total: number;
  customer: CustomerDto;
  InvoiceDetails: InvoiceDetailDto[]
}

export interface InvoiceDetailDto {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface CustomerDto {
  customerId: number;
  name: string;
  customerNumber: number;
  location: string;
  invoices: InvoiceDto[];
}

export interface CustomerToSaveDto {
  name: string;
  customerNumber: number;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = "http://localhost:5253/api/Customer"

  private readonly http = inject(HttpClient); 

  getAll(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(this.url);
  }

  getById(id: number): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${this.url}/${id}`);
  }

  create(customer: CustomerToSaveDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(this.url, customer);
  }

  update(id: number, customer: CustomerToSaveDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, customer);
  }

  delete(id: number): Observable<string> {
  return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
}
}
