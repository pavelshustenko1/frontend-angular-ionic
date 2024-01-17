import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  mapToCanActivate,
} from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthPageModule } from './pages/auth/auth.module';
import { RoomPageModule } from './pages/room/room.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'room',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => AuthPageModule,
  },
  {
    path: 'room',
    loadChildren: () => RoomPageModule,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
