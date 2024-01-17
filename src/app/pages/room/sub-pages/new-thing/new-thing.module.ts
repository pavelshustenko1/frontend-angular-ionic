import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewThingPageRoutingModule } from './new-thing-routing.module';

import { NewThingPage } from './new-thing.page';
import { CustomFormControlModule } from '../../../../shared/components/custom-form-control/custom-form-control.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFormControlModule,
    IonicModule,
    NewThingPageRoutingModule,
  ],
  declarations: [NewThingPage],
})
export class NewThingPageModule {}
