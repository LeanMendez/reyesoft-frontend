import { Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';



export const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES), 
    canActivate: [LoginGuard]
  },
  { 
    path: 'systems', 
    loadChildren: () => import('./product/product.routes').then(m => m.PRODUCT_ROUTES), 
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];