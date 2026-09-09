import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/models';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (s) => ({ ...s, loading: true, error: null })),
  on(AuthActions.loginSuccess, (s, { token, user }) => ({
    ...s,
    token,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFail, (s, { error }) => ({ ...s, loading: false, error })),
  on(AuthActions.logout, AuthActions.logoutConfirm, AuthActions.sessionExpire, (s) => ({
    ...s,
    user: null,
    token: null,
    loading: false,
    error: null,
  })),
  on(AuthActions.restoreSession, (s, { token, user }) => ({
    ...s,
    token,
    user,
    loading: false,
  })),
);
