import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { TYPES } from '../../../core/tokens/types';
import { AuthService } from '../interface/auth.service.interface';
import { GlobalState } from '../../../reducers';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { AuthActions } from './auth.actions';
import { RouterActions } from '../../../core/store/router/router.actions';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ credentials }) => {
        return this.authService.signup(credentials).pipe(
          map((authProfile) => {
            return AuthActions.success({ authProfile });
          }),
          catchError(() => of(AuthActions.failed({ message: 'Auth failed!' })))
        );
      })
    )
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signin),
      switchMap(({ credentials }) => {
        return this.authService.signin(credentials).pipe(
          map((authProfile) => {
            return AuthActions.success({ authProfile });
          }),
          catchError(() => of(AuthActions.failed({ message: 'Auth failed!' })))
        );
      })
    )
  );

  success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.success),
        tap(() => {
          this.store.dispatch(
            RouterActions.go({ path: ['room', 'tabs', 'things'] })
          );
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.store.dispatch(RouterActions.go({ path: ['auth'] }));
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    @Inject(TYPES.services.AuthService)
    private readonly authService: AuthService,
    private readonly store: Store<GlobalState>
  ) {}
}
