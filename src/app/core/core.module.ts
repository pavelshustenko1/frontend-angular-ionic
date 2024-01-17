import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { RouterEffect } from './store/router/router.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule, isDevMode } from '@angular/core';
import { RouterCustomSerializer } from './store/router/router.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from '../reducers';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpResponseInterceptor } from './interceptors/http-response.interceptor';

const PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor,
  },
  {
    provide: RouterStateSerializer,
    useClass: RouterCustomSerializer,
  },
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: HttpResponseInterceptor,
  },
];

@NgModule({
  declarations: [],
  providers: [...PROVIDERS],
  imports: [
    HttpClientModule,
    StoreRouterConnectingModule.forRoot({
      serializer: RouterCustomSerializer,
    }),
    EffectsModule.forRoot([RouterEffect]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
})
export class CoreModule {}
