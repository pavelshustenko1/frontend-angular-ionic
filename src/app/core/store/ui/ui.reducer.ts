import { createFeature, createReducer, on } from '@ngrx/store';
import { UIActions } from './ui.actions';

export const uiFeatureKey = 'ui';

export interface UIState {
  httpError: string;
}

export const initialState: UIState = {
  httpError: '',
};

export const reducer = createReducer(
  initialState,
  on(UIActions.setHttpError, (state, { message }): UIState => {
    return {
      ...state,
      httpError: message,
    };
  }),
  on(UIActions.removeHttpError, (state): UIState => {
    return {
      ...state,
      ...initialState,
    };
  })
);

export const uiFeature = createFeature({
  name: uiFeatureKey,
  reducer,
});
