import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UIActions = createActionGroup({
  source: 'UI',
  events: {
    setHttpError: props<{ message: string }>(),
    removeHttpError: emptyProps(),
  },
});
