import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../../../reducers';
import { Store } from '@ngrx/store';

import { CustomDestroyComponent } from '../../../../shared/classes/custom-destroy';
import { Observable, takeUntil, tap } from 'rxjs';

import { selectContainer } from '../../store/room.selectors';
import { Container } from '../../models/container.model';
import { Thing } from '../../models/thing.model';
import { IonItemSliding } from '@ionic/angular';
import { RoomActions } from '../../store/room.actions';

@Component({
  selector: 'app-container',
  templateUrl: './container.page.html',
  styleUrls: ['./container.page.scss'],
})
export class ContainerPage extends CustomDestroyComponent implements OnInit {
  container$:
    | Observable<{ container: Container; usedThings: Thing[] }>
    | undefined;

  constructor(private readonly store: Store<GlobalState>) {
    super();
  }

  ngOnInit() {
    this.container$ = this.store
      .select(selectContainer)
      .pipe(takeUntil(this.destroy$));
  }

  onDelete(containerId: string, thingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.store.dispatch(
      RoomActions.removeThinFromContainer({ thingId, containerId })
    );
  }
}
