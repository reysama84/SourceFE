import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models';

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: User }>(),
);
export const loginFail = createAction('[Auth] Login Fail', props<{ error: string }>());
export const logout = createAction('[Auth] Logout');
export const logoutConfirm = createAction('[Auth] Logout Confirm');
export const sessionExpire = createAction('[Auth] Session Expire');
export const restoreSession = createAction(
  '[Auth] Restore Session',
  props<{ token: string; user: User }>(),
);
