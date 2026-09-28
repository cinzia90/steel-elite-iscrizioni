import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

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
    path: 'iscriviti/certificato',
    loadComponent: () =>
      import('./features/signup/certificate/certificate.component').then((m) => m.CertificateComponent),
    canActivate: [authGuard],
  },
  {
    path: 'iscriviti/contratto',
    loadComponent: () => import('./features/signup/contract/contract.component').then((m) => m.ContractComponent),
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
    path: 'admin/contratti',
    loadComponent: () =>
      import('./features/admin/contracts/admin-contracts.component').then((m) => m.AdminContractsComponent),
    canActivate: [roleGuard(['admin'])],
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
