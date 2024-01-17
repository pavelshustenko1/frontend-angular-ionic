import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './container/auth.page';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { StoreModule } from '@ngrx/store';
import { authFeature } from './store/auth.reducer';
import { RouterEffect } from '../../core/store/router/router.effects';
import { CustomFormControlModule } from '../../shared/components/custom-form-control/custom-form-control.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AuthPageRoutingModule,
    CustomFormControlModule,
    EffectsModule.forFeature([AuthEffects, RouterEffect]),
    StoreModule.forFeature(authFeature.name, authFeature.reducer),
  ],
  declarations: [AuthPage],
  providers: [],
})
export class AuthPageModule {}
