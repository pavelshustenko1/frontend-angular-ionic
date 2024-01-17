import { NgModule, Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { RouterEffect } from './core/store/router/router.effects';
import { AuthEffects } from './pages/auth/store/auth.effects';
import { TYPES } from './core/tokens/types';
import { AuthServiceImpl } from './pages/auth/service/auth.service';
import { StoreModule } from '@ngrx/store';
import { uiFeature } from './core/store/ui/ui.reducer';

const PROVIDERS: Provider[] = [
  {
    provide: TYPES.services.AuthService,
    useClass: AuthServiceImpl,
  },
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
];

@NgModule({
  imports: [
    CoreModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forFeature(uiFeature.name, uiFeature.reducer),
    EffectsModule.forFeature([AuthEffects, RouterEffect]),
  ],
  declarations: [AppComponent],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
