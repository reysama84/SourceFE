import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';

import { selectHasClockedIn, selectAttendanceLoaded } from '../../state/attendance/attendance.selectors';

export const ClockInGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const store = inject(Store);

  // Allow viewing attendance history even when not clocked in.
  if (route.routeConfig?.path === 'attendance') return true;

  return store.select(selectAttendanceLoaded).pipe(
    filter((loaded) => loaded),
    take(1),
    map(() => {
      let hasClockedIn = false;
      store.select(selectHasClockedIn).pipe(take(1)).subscribe((v) => (hasClockedIn = v));
      return hasClockedIn ? true : router.createUrlTree(['/clock-in']);
    }),
  );
};
