import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const RouterActions = createActionGroup({
  source: 'Router',
  events: {
    go: props<{ path: string[]; queryParam?: Record<string, string> }>(),
    back: emptyProps(),
  },
});
