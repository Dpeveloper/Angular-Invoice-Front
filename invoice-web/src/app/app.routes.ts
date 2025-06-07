import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadComponent:() => import('./pages/customer/customer.component').then(mod => mod.CustomerComponent)
    },
    {
    path: 'invoice',
    loadComponent:() => import('./pages/invoice/invoice.component').then(mod => mod.InvoiceFormComponent)
    },

];
