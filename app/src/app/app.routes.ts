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
    path: 'tessera',
    loadComponent: () => import('./features/card/card.component').then((m) => m.CardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'staff/check-in',
    loadComponent: () => import('./features/staff/check-in/check-in.component').then((m) => m.CheckInComponent),
    canActivate: [roleGuard(['staff', 'admin'])],
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    canActivate: [roleGuard(['admin'])],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'clienti',
        loadComponent: () =>
          import('./features/admin/clients/admin-clients.component').then((m) => m.AdminClientsComponent),
      },
      {
        path: 'clienti/:id',
        loadComponent: () =>
          import('./features/admin/clients/admin-client-detail.component').then(
            (m) => m.AdminClientDetailComponent,
          ),
      },
      {
        path: 'certificati',
        loadComponent: () =>
          import('./features/admin/certificates/admin-certificates.component').then(
            (m) => m.AdminCertificatesComponent,
          ),
      },
      {
        path: 'piani',
        loadComponent: () =>
          import('./features/admin/plans/admin-plans.component').then((m) => m.AdminPlansComponent),
      },
      {
        path: 'ingressi',
        loadComponent: () =>
          import('./features/admin/access-logs/admin-access-logs.component').then(
            (m) => m.AdminAccessLogsComponent,
          ),
      },
      {
        path: 'staff',
        loadComponent: () =>
          import('./features/admin/staff/admin-staff.component').then((m) => m.AdminStaffComponent),
      },
      {
        path: 'contratti',
        loadComponent: () =>
          import('./features/admin/contracts/admin-contracts.component').then((m) => m.AdminContractsComponent),
      },
      {
        path: 'impostazioni',
        loadComponent: () =>
          import('./features/admin/settings/admin-settings.component').then((m) => m.AdminSettingsComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
