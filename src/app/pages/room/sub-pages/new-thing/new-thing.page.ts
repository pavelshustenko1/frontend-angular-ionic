import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../../reducers';
import { RoomActions } from '../../store/room.actions';
import { selectLoading } from '../../store/room.selectors';
import { filter, take } from 'rxjs';
import { RouterActions } from '../../../../core/store/router/router.actions';

@Component({
  selector: 'app-new-thing',
  templateUrl: './new-thing.page.html',
  styleUrls: ['./new-thing.page.scss'],
})
export class NewThingPage implements OnInit {
  public form!: FormGroup;
  private loadingCtrRef: HTMLIonLoadingElement | undefined;

  constructor(
    private store: Store<GlobalState>,
    private readonly fb: FormBuilder,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.buildForm();
    this.watchWhenThingCreated();
  }

  public addThing() {
    if (this.form.valid) {
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Creating a thing...' })
        .then((loadingEl) => {
          this.loadingCtrRef = loadingEl;
          loadingEl.present();
          this.store.dispatch(
            RoomActions.addThing({ dto: { ...this.form.value } })
          );
        });
    }
  }

  private watchWhenThingCreated() {
    this.store
      .select(selectLoading)
      .pipe(
        filter((x) => !!x),
        take(1)
      )
      .subscribe(() => {
        this.loadingCtrRef?.dismiss();
        this.store.dispatch(RouterActions.back());
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', { validators: [Validators.required] }],
      description: ['', { validators: [Validators.required] }],
      length: ['', { validators: [Validators.required] }],
      width: ['', { validators: [Validators.required] }],
      height: ['', { validators: [Validators.required] }],
    });
  }
}
