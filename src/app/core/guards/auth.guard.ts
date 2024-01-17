import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalState } from '../../reducers';
import { selectIsAuthenticated } from '../../pages/auth/store/auth.selectors';
import { RouterActions } from '../store/router/router.actions';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private readonly store: Store<GlobalState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.store.dispatch(RouterActions.go({ path: ['auth'] }));
          return !isAuthenticated;
        }
        return isAuthenticated;
      })
    );
  }
}
