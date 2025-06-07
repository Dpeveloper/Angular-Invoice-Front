import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceDto, InvoiceToSave } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5253/api/Invoice';

  getAll(): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<InvoiceDto> {
    return this.http.get<InvoiceDto>(`${this.baseUrl}/${id}`);
  }

  create(invoice: InvoiceToSave): Observable<InvoiceDto> {
    return this.http.post<InvoiceDto>(this.baseUrl, invoice);
  }

  update(id: number, invoice: InvoiceToSave): Observable<InvoiceDto> {
    return this.http.put<InvoiceDto>(`${this.baseUrl}/${id}`, invoice);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
