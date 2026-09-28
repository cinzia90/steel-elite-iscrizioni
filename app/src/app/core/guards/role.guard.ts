import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../../shared/models/profile.model';

export function roleGuard(allowed: UserRole[]): CanActivateFn {
  return async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.ready()) {
      await new Promise<void>((resolve) => {
        const check = () => (auth.ready() ? resolve() : setTimeout(check, 25));
        check();
      });
    }

    const role = auth.role();
    if (role && allowed.includes(role)) {
      return true;
    }

    return router.createUrlTree(['/login']);
  };
}
