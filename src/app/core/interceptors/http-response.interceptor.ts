import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../reducers';
import { AuthActions } from '../../pages/auth/store/auth.actions';
import { UIActions } from '../store/ui/ui.actions';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<GlobalState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
          this.store.dispatch(AuthActions.logout());
        }
        if (error) {
          this.store.dispatch(
            UIActions.setHttpError({ message: error.error.message })
          );
        }
        return throwError(() => new Error());
      })
    );
  }
}
