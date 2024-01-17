import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthProfile } from '../types/auth-profile.type';

export const authFeatureKey = 'auth';

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  authError: string;
  authProfile: AuthProfile;
}

export const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  authError: '',
  authProfile: new AuthProfile(),
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.signin, (state): AuthState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AuthActions.signup, (state): AuthState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AuthActions.success, (state, { authProfile }): AuthState => {
    return {
      ...state,
      loading: false,
      authError: '',
      authProfile,
      isAuthenticated: true,
    };
  }),
  on(AuthActions.failed, (state, { message }): AuthState => {
    return {
      ...state,
      loading: false,
      authError: message,
      authProfile: new AuthProfile(),
    };
  }),
  on(AuthActions.logout, (state): AuthState => {
    return {
      ...state,
      ...initialState,
    };
  })
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
