import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
