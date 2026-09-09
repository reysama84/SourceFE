import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import { selectIsAuthenticated } from '../../state/auth/auth.selectors';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);
  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map((authed) => (authed ? true : router.createUrlTree(['/auth/login']))),
  );
};
