
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('loggedUser')
  ) {
    return true;
  }
  return false;
};
