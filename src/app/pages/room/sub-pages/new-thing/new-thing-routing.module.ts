import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewThingPage } from './new-thing.page';

const routes: Routes = [
  {
    path: '',
    component: NewThingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewThingPageRoutingModule {}
