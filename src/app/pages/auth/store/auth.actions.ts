import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  RequestSignin,
  RequestSignup,
} from '../interface/auth-request.interface';
import { AuthProfile } from '../types/auth-profile.type';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    signin: props<{ credentials: RequestSignin }>(),
    signup: props<{ credentials: RequestSignup }>(),
    success: props<{ authProfile: AuthProfile }>(),
    failed: props<{ message: string }>(),
    logout: emptyProps(),
  },
});
