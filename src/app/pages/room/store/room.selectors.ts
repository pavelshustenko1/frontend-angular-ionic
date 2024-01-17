import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomState, roomFeature } from './room.reducer';
import { Thing } from '../models/thing.model';
import { Container } from '../models/container.model';
import { selectParams } from '../../../core/store/router/router.selector';

export const selectRoomState = createFeatureSelector<RoomState>(
  roomFeature.name
);

export const selectThings = createSelector(
  selectRoomState,
  (state) => Object.values(state.things!.entities!) as Thing[]
);

export const selectContainers = createSelector(
  selectRoomState,
  (state) => Object.values(state.containers!.entities!) as Container[]
);

export const selectLoading = createSelector(
  selectRoomState,
  (state) => state.loading
);

export const selectContainer = createSelector(
  selectContainers,
  selectThings,
  selectParams,
  (containers, things, { containerId }) => {
    const container = containers.find((x) => x.id === containerId) as Container;
    const usedThings = things.filter((x) =>
      container.thingsInside.includes(x.id)
    );

    return { container, usedThings };
  }
);
