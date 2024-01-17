import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Thing } from '../models/thing.model';
import { Container } from '../models/container.model';

export const RoomActions = createActionGroup({
  source: 'Room',
  events: {
    getThings: emptyProps(),
    getThingsSuccess: props<{ things: Thing[] }>(),
    getContainers: emptyProps(),
    getContainersSuccess: props<{ containers: Container[] }>(),
    addThing: props<{ dto: Partial<Thing> }>(),
    addThingSuccess: props<{ thing: Thing }>(),
    addContainer: props<{ dto: Partial<Container> }>(),
    addContainerSuccess: props<{ container: Container }>(),
    deleteThing: props<{ id: string }>(),
    deleteThingSucess: props<{ thing: Thing }>(),
    deleteContainer: props<{ id: string }>(),
    deleteContainerSuccess: props<{ container: Container }>(),
    putThinIntoContainer: props<{ thingId: string; conteinerId: string }>(),
    putThinIntoContainerSuccess: props<{ container: Container }>(),
    removeThinFromContainer: props<{ thingId: string; containerId: string }>(),
    removeThinFromContainerSuccess: props<{ container: Container }>(),
    error: props<{ message: string }>(),
  },
});
