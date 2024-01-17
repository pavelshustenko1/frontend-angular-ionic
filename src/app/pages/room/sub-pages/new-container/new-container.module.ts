import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewContainerPageRoutingModule } from './new-container-routing.module';

import { NewContainerPage } from './new-container.page';
import { CustomFormControlModule } from '../../../../shared/components/custom-form-control/custom-form-control.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomFormControlModule,
    IonicModule,
    NewContainerPageRoutingModule,
  ],
  declarations: [NewContainerPage],
})
export class NewContainerPageModule {}
