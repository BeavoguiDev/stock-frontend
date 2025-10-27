import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(selectAuthState, (s) => s?.token);
export const selectUser = createSelector(selectAuthState, (s) => s?.user);
export const selectIsLoggedIn = createSelector(selectToken, (t) => !!t);
