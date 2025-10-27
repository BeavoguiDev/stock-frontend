import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  user: any | null;
}

export const initialAuthState: AuthState = {
  token: localStorage.getItem('auth_token') || null,
  user: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.setToken, (state, { token }) => {
    try { localStorage.setItem('auth_token', token); } catch {}
    return { ...state, token };
  }),
  on(AuthActions.clearToken, (state) => {
    try { localStorage.removeItem('auth_token'); } catch {}
    return { ...state, token: null };
  }),
  on(AuthActions.setUser, (state, { user }) => ({ ...state, user })),
  on(AuthActions.clearUser, () => ({ token: null, user: null }))
);
