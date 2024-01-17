import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../reducers';
import { first, mergeMap } from 'rxjs/operators';
import { selectAuthProfile } from '../../pages/auth/store/auth.selectors';
import { AuthProfile } from '../../pages/auth/types/auth-profile.type';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<GlobalState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthProfile).pipe(
      first(),
      mergeMap((authProfile: AuthProfile) => {
        const authReq = authProfile
          ? req.clone({
              headers: new HttpHeaders({
                authorization: `Bearer ${authProfile.accessToken}`,
              }),
            })
          : req;
        return next.handle(authReq);
      })
    );
  }
}
