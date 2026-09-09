import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import { authReducer, AuthState } from './auth/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

export const effects = [AuthEffects];
export { AuthEffects } from './auth/auth.effects';
