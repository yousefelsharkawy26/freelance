import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _user = inject( UserService );
  const _router = inject (Router);

  if (_user.isLoggedIn() == false) {
    _router.navigate(['/login']);
    return false;
  }
  return true;
};
