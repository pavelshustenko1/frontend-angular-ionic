import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../../reducers';
import { Observable, filter, takeUntil } from 'rxjs';
import { Thing } from '../../models/thing.model';
import {
  selectContainers,
  selectLoading,
  selectThings,
} from '../../store/room.selectors';
import { RouterActions } from '../../../../core/store/router/router.actions';
import { RoomActions } from '../../store/room.actions';
import { LoadingController, ModalController } from '@ionic/angular';
import { ContainerSelectorComponent } from '../../compenents/container-selector/container-selector.component';
import { CustomDestroyComponent } from '../../../../shared/classes/custom-destroy';

@Component({
  selector: 'app-things',
  templateUrl: './things.page.html',
  styleUrls: ['./things.page.scss'],
})
export class ThingsPage extends CustomDestroyComponent implements OnInit {
  public things$: Observable<Thing[]> | undefined;
  private loadingCtrRef: HTMLIonLoadingElement | undefined;

  constructor(
    private readonly modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private readonly store: Store<GlobalState>
  ) {
    super();
  }

  ngOnInit() {
    this.things$ = this.store.select(selectThings);
    this.watchWhenThingIsPut();
  }

  addThing() {
    this.store.dispatch(
      RouterActions.go({ path: ['room', 'tabs', 'things', 'new'] })
    );
  }

  onDelete(id: string) {
    this.store.dispatch(RoomActions.deleteThing({ id }));
  }

  putThing(thing: Thing) {
    this.modalCtrl
      .create({
        component: ContainerSelectorComponent,
        componentProps: {
          thing,
          containers: this.store.select(selectContainers),
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.conformPuttingThing(resultData.data);
        }
      });
  }

  private conformPuttingThing(data: { thingId: string; containerId: string }) {
    this.loadingCtrl
      .create({ message: 'Putting thing into a container...' })
      .then((loadingEl) => {
        this.loadingCtrRef = loadingEl;
        loadingEl.present();
        this.store.dispatch(
          RoomActions.putThinIntoContainer({
            thingId: data.thingId,
            conteinerId: data.containerId,
          })
        );
      });
  }

  private watchWhenThingIsPut() {
    this.store
      .select(selectLoading)
      .pipe(
        filter((x) => !x),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadingCtrRef?.dismiss();
      });
  }
}
