import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Container } from '../../models/container.model';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../../reducers';
import { selectContainers } from '../../store/room.selectors';
import { RouterActions } from '../../../../core/store/router/router.actions';
import { RoomActions } from '../../store/room.actions';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.page.html',
  styleUrls: ['./containers.page.scss'],
})
export class ContainersPage implements OnInit {
  containers$: Observable<Container[]> | undefined;

  constructor(private readonly store: Store<GlobalState>) {}

  ngOnInit() {
    this.containers$ = this.store.select(selectContainers);
  }

  addContainer() {
    this.store.dispatch(
      RouterActions.go({ path: ['room', 'tabs', 'containers', 'new'] })
    );
  }

  onDelete(id: string) {
    this.store.dispatch(RoomActions.deleteContainer({ id }));
  }

  showContainer(container: Container) {
    if (container.thingsInside.length === 0) return;

    this.store.dispatch(
      RouterActions.go({ path: ['room', 'tabs', 'containers', container.id] })
    );
  }
}
