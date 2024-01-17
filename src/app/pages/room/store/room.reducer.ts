import { createFeature, createReducer, on } from '@ngrx/store';
import { Thing } from '../models/thing.model';
import { EntityState, Update, createEntityAdapter } from '@ngrx/entity';
import { Container } from '../models/container.model';
import { RoomActions } from './room.actions';

export const roomFeatureKey = 'room';

export interface ThingsState extends EntityState<Thing> {
  total: number;
}

export interface ContainersState extends EntityState<Container> {
  total: number;
}

export interface RoomState {
  things: ThingsState;
  containers: ContainersState;
  loading: boolean;
}

export const thingsAdapter = createEntityAdapter<Thing>({
  selectId: ({ id }) => id,
});

export const containersAdapter = createEntityAdapter<Container>({
  selectId: ({ id }) => id,
});

export const thingsInitialState: ThingsState = thingsAdapter.getInitialState({
  total: 0,
});

export const containersInitialState: ContainersState =
  containersAdapter.getInitialState({
    total: 0,
  });

export const initialState: RoomState = {
  things: thingsInitialState,
  containers: containersInitialState,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(RoomActions.getThingsSuccess, (state, { things }): RoomState => {
    return {
      ...state,
      things: thingsAdapter.upsertMany(things, {
        ...state.things,
        total: things.length,
      }),
    };
  }),
  on(RoomActions.getContainersSuccess, (state, { containers }): RoomState => {
    return {
      ...state,
      containers: containersAdapter.upsertMany(containers, {
        ...state.containers,
        total: containers.length,
      }),
    };
  }),
  on(
    RoomActions.addThing,
    RoomActions.addContainer,
    RoomActions.putThinIntoContainer,
    (state): RoomState => {
      return {
        ...state,
        loading: true,
      };
    }
  ),
  on(RoomActions.addThingSuccess, (state, { thing }): RoomState => {
    return {
      ...state,
      loading: false,
      things: thingsAdapter.upsertOne(thing, {
        ...state.things,
        total: state.things.total + 1,
      }),
    };
  }),
  on(RoomActions.addContainerSuccess, (state, { container }): RoomState => {
    return {
      ...state,
      loading: false,
      containers: containersAdapter.upsertOne(container, {
        ...state.containers,
        total: state.containers.total + 1,
      }),
    };
  }),
  on(RoomActions.deleteThingSucess, (state, { thing }): RoomState => {
    return {
      ...state,
      things: thingsAdapter.removeOne(thing.id, {
        ...state.things,
        total: state.things.total - 1,
      }),
    };
  }),
  on(RoomActions.deleteContainerSuccess, (state, { container }): RoomState => {
    return {
      ...state,
      containers: containersAdapter.removeOne(container.id, {
        ...state.containers,
        total: state.containers.total - 1,
      }),
    };
  }),
  on(
    RoomActions.putThinIntoContainerSuccess,
    (state, { container }): RoomState => {
      const thingsToUpdate = Object.values(state.things!.entities!).filter(
        (x) => container.thingsInside.includes(x!.id)
      );

      const updatedThins: Update<Thing>[] = [
        ...thingsToUpdate.map((x) => ({
          id: x!.id,
          changes: { ...x, isUsed: true },
        })),
      ];

      return {
        ...state,
        loading: false,
        containers: containersAdapter.upsertOne(container, {
          ...state.containers,
          total: state.containers.total,
        }),
        things: thingsAdapter.updateMany(updatedThins, {
          ...state.things,
          total: state.things.total,
        }),
      };
    }
  ),
  on(
    RoomActions.removeThinFromContainerSuccess,
    (state, { container }): RoomState => {
      const currentContainer = Object.values(state.containers!.entities!).find(
        (x) => x!.id === container.id
      );

      const thingsToUpdate = Object.values(state.things!.entities!).filter(
        (x) => currentContainer!.thingsInside.includes(x!.id)
      );

      const updatedThins: Update<Thing>[] = [
        ...thingsToUpdate.map((x) => ({
          id: x!.id,
          changes: { ...x, isUsed: false },
        })),
      ];

      return {
        ...state,
        loading: false,
        containers: containersAdapter.upsertOne(container, {
          ...state.containers,
          total: state.containers.total,
        }),
        things: thingsAdapter.updateMany(updatedThins, {
          ...state.things,
          total: state.things.total,
        }),
      };
    }
  ),
  on(RoomActions.error, (state): RoomState => {
    return {
      ...state,
      loading: false,
    };
  })
);

export const roomFeature = createFeature({
  name: roomFeatureKey,
  reducer,
});
