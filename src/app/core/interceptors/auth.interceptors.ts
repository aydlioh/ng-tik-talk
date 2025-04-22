import { AuthService } from '@/core/services/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token;

  if (!token) return next(req);

  const reqWithToken = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  return next(reqWithToken);
};
