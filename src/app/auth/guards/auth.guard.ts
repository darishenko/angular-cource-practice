import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();
  if (!isLoggedIn) {
    alert('To perform the action, you must log in!');
  }
  return isLoggedIn;
};
