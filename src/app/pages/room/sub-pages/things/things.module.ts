import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThingsPageRoutingModule } from './things-routing.module';

import { ThingsPage } from './things.page';
import { ContainerSelectorComponent } from '../../compenents/container-selector/container-selector.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ThingsPageRoutingModule,
    ContainerSelectorComponent,
  ],
  declarations: [ThingsPage],
})
export class ThingsPageModule {}
