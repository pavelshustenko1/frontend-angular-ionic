import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoomPageRoutingModule } from './room-routing.module';
import { RoomPage } from './room.page';
import { EffectsModule } from '@ngrx/effects';
import { RoomEffects } from './store/room.effects';
import { StoreModule } from '@ngrx/store';
import { roomFeature } from './store/room.reducer';
import { RouterEffect } from '../../core/store/router/router.effects';
import { TYPES } from '../../core/tokens/types';
import { RoomSeerviceImpl } from './service/room.service';

const service: Provider = {
  provide: TYPES.services.RoomService,
  useClass: RoomSeerviceImpl,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomPageRoutingModule,
    StoreModule.forFeature(roomFeature.name, roomFeature.reducer),
    EffectsModule.forFeature([RoomEffects, RouterEffect]),
  ],
  declarations: [RoomPage],
  providers: [service],
})
export class RoomPageModule {}
