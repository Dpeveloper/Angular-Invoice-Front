import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDto, CustomerToSaveDto } from '../../services/customer-service.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = "http://localhost:5253/api/Customer"

  private readonly http = inject(HttpClient); 

  // GET: Obtener todos los clientes
  getAll(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(this.url);
  }

  // GET: Obtener un cliente por ID
  getById(id: number): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${this.url}/${id}`);
  }

  // POST: Crear nuevo cliente
  create(customer: CustomerToSaveDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(this.url, customer);
  }

  // PUT: Actualizar cliente existente
  update(id: number, customer: CustomerToSaveDto): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, customer);
  }

  // DELETE: Eliminar cliente por ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
