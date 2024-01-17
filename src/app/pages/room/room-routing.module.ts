import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomPage } from './room.page';
import { ContainersPageModule } from './sub-pages/containers/containers.module';
import { ThingsPageModule } from './sub-pages/things/things.module';
import { NewThingPageModule } from './sub-pages/new-thing/new-thing.module';
import { NewContainerPageModule } from './sub-pages/new-container/new-container.module';
import { ContainerPageModule } from './sub-pages/container/container.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: RoomPage,
    children: [
      {
        path: 'things',
        children: [
          {
            path: '',
            loadChildren: () => ThingsPageModule,
          },
          {
            path: 'new',
            loadChildren: () => NewThingPageModule,
          },
        ],
      },
      {
        path: 'containers',
        children: [
          {
            path: '',
            loadChildren: () => ContainersPageModule,
          },
          {
            path: 'new',
            loadChildren: () => NewContainerPageModule,
          },
          {
            path: ':containerId',
            loadChildren: () => ContainerPageModule,
          },
        ],
      },
      {
        path: '',
        redirectTo: '/room/tabs/things',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/room/tabs/things',
    pathMatch: 'full',
  },
  {
    path: 'new-container',
    loadChildren: () =>
      import('./sub-pages/new-container/new-container.module').then(
        (m) => m.NewContainerPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomPageRoutingModule {}
