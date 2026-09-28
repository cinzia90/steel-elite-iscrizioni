import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'iscriviti',
    loadComponent: () =>
      import('./features/signup/plan-select/plan-select.component').then((m) => m.PlanSelectComponent),
  },
  {
    path: 'iscriviti/account',
    loadComponent: () => import('./features/signup/account/account.component').then((m) => m.AccountComponent),
  },
  {
    path: 'iscriviti/profilo',
    loadComponent: () => import('./features/signup/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'iscriviti/pagamento',
    loadComponent: () => import('./features/signup/payment/payment.component').then((m) => m.PaymentComponent),
    canActivate: [authGuard],
  },
  {
    path: 'iscriviti/conferma',
    loadComponent: () =>
      import('./features/signup/payment-pending/payment-pending.component').then((m) => m.PaymentPendingComponent),
    canActivate: [authGuard],
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
