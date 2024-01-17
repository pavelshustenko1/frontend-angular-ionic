import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContainersPageRoutingModule } from './containers-routing.module';

import { ContainersPage } from './containers.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ContainersPageRoutingModule,
  ],
  declarations: [ContainersPage],
})
export class ContainersPageModule {}
