import { routerReducer } from '@ngrx/router-store';
import { authFeature } from '../pages/auth/store/auth.reducer';
import { uiFeature } from '../core/store/ui/ui.reducer';
import { roomFeature } from '../pages/room/store/room.reducer';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface GlobalState {}

export const reducers: ActionReducerMap<GlobalState> = {
  router: routerReducer,
  auth: authFeature.reducer,
  ui: uiFeature.reducer,
  room: roomFeature.reducer,
};

export const metaReducers: MetaReducer<GlobalState>[] = [
  appMetaReducer,
  localStorageSyncReducer,
];

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    rehydrate: true,
    keys: ['auth', 'router', 'ui', 'room'],
  })(reducer);
}

export function appMetaReducer(reducer: any) {
  return function newReducer(state: any, action: any) {
    const nextState = state;
    return reducer(nextState, action);
  };
}
