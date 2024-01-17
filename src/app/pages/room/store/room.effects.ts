import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { RoomActions } from './room.actions';
import { TYPES } from '../../../core/tokens/types';
import { RoomService } from '../interfaces/room-service.interface';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class RoomEffects {
  getThings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.getThings),
      switchMap(() => {
        return this.roomService.getThings().pipe(
          map((things) => {
            return RoomActions.getThingsSuccess({ things });
          }),
          catchError(() => of(RoomActions.error({ message: 'Action failed!' })))
        );
      })
    )
  );

  getContainers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.getContainers),
      switchMap(() => {
        return this.roomService.getContainers().pipe(
          map((containers) => {
            return RoomActions.getContainersSuccess({ containers });
          }),
          catchError(() => of(RoomActions.error({ message: 'Action failed!' })))
        );
      })
    )
  );

  addThing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.addThing),
      switchMap(({ dto }) => {
        return this.roomService.addTing(dto).pipe(
          map((thing) => {
            return RoomActions.addThingSuccess({ thing });
          }),
          catchError(() => of(RoomActions.error({ message: 'Action failed!' })))
        );
      })
    )
  );

  addContainer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.addContainer),
      switchMap(({ dto }) => {
        return this.roomService.addContainer(dto).pipe(
          map((container) => {
            return RoomActions.addContainerSuccess({ container });
          }),
          catchError(() => of(RoomActions.error({ message: 'Action failed!' })))
        );
      })
    )
  );

  deleteContainer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.deleteContainer),
      switchMap(({ id }) => {
        return this.roomService.deleteContainer(id).pipe(
          map((container) => {
            return RoomActions.deleteContainerSuccess({ container });
          }),
          catchError(() => of(RoomActions.error({ message: 'Action failed!' })))
        );
      })
    )
  );

  deleteThing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.deleteThing),
      switchMap(({ id }) => {
        return this.roomService.deleteTing(id).pipe(
          map((thing) => {
            return RoomActions.deleteThingSucess({ thing });
          }),
          catchError(() => of(RoomActions.error({ message: 'Action failed!' })))
        );
      })
    )
  );

  putThingIntoContainer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.putThinIntoContainer),
      switchMap(({ thingId, conteinerId }) => {
        return this.roomService.putThing(thingId, conteinerId).pipe(
          map((container) => {
            return RoomActions.putThinIntoContainerSuccess({ container });
          }),
          catchError(() => of(RoomActions.error({ message: 'Action failed!' })))
        );
      })
    )
  );

  removeThingFromContainer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.removeThinFromContainer),
      switchMap(({ thingId, containerId }) => {
        return this.roomService.removeThing(thingId, containerId).pipe(
          map((container) => {
            return RoomActions.removeThinFromContainerSuccess({ container });
          }),
          catchError(() => of(RoomActions.error({ message: 'Action failed!' })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    @Inject(TYPES.services.RoomService)
    private readonly roomService: RoomService
  ) {}
}
