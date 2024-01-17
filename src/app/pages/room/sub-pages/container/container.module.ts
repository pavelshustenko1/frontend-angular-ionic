import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContainerPageRoutingModule } from './container-routing.module';

import { ContainerPage } from './container.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ContainerPageRoutingModule,
  ],
  declarations: [ContainerPage],
})
export class ContainerPageModule {}
