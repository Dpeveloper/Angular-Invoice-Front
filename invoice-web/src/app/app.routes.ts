import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadComponent:() => import('./pages/customer/customer.component').then(mod => mod.CustomerComponent)
  },

];
