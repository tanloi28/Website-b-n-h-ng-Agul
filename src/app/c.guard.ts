import { CanActivateFn } from '@angular/router';

export const cGuard: CanActivateFn = (route, state) => {
  return true;
};
