import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../reducers';
import { Store } from '@ngrx/store';
import { RoomActions } from './store/room.actions';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  constructor(private readonly store: Store<GlobalState>) {}

  ngOnInit() {
    this.store.dispatch(RoomActions.getThings());
    this.store.dispatch(RoomActions.getContainers());
  }
}
