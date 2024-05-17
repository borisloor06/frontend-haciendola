import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  if (state.url === '/login' && !token) {
    return true;
  }

  if (!token) {
    console.log(router);
    router.navigate(['/login']);
    return false;
  }

  const response = await authService.validateToken(token);
  if (state.url === '/login' && token) {
    if (response.status === 200 && response.body!.valid) {
      router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  if (response.status === 401) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
