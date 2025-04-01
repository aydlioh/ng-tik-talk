import { inject } from '@angular/core';
import { AuthService } from '@/core/services/auth.service';
import { Router } from '@angular/router';

export const canActivateAuth = () => {
  const isLoggedIn = inject(AuthService).isAuth;

  if (!isLoggedIn) {
    return inject(Router).createUrlTree(['/login']);
  }

  return true;
};
