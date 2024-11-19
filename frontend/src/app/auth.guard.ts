import { afterNextRender } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const storedData = localStorage.getItem('loggedUser');
 if (storedData) {
   return true;
 }
 return false;
};
