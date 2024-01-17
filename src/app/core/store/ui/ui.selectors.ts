import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState, uiFeature } from './ui.reducer';

export const selectUIState = createFeatureSelector<UIState>(uiFeature.name);

export const selectHttpError = createSelector(
  selectUIState,
  ({ httpError }) => httpError
);
