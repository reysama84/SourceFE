import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private auth = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ username, password }) =>
        this.auth.login(username, password).pipe(
          map((res) => AuthActions.loginSuccess({ token: res.token, user: res.user })),
          catchError((err: Error) =>
            of(AuthActions.loginFail({ error: err.message ?? 'Gagal masuk' })),
          ),
        ),
      ),
    ),
  );

  navigateAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigateByUrl('/loading')),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout, AuthActions.sessionExpire),
        tap(() => {
          this.auth.logout();
          this.router.navigateByUrl('/auth/login');
        }),
      ),
    { dispatch: false },
  );
}
