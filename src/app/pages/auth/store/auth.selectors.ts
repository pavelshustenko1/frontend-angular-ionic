import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeature } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(
  authFeature.name
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  ({ isAuthenticated }) => isAuthenticated
);

export const selectIsLoading = createSelector(
  selectAuthState,
  ({ loading }) => loading
);

export const selectAuthProfile = createSelector(
  selectAuthState,
  ({ authProfile }) => authProfile
);
