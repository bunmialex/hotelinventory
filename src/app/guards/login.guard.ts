import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  return loginService.isLoggedIn
    ? true
    : loginService.router.navigate(['/login']);
};
