import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../../reducers';
import { RoomActions } from '../../store/room.actions';
import { filter, take } from 'rxjs';
import { RouterActions } from '../../../../core/store/router/router.actions';
import { selectLoading } from '../../store/room.selectors';

@Component({
  selector: 'app-new-container',
  templateUrl: './new-container.page.html',
  styleUrls: ['./new-container.page.scss'],
})
export class NewContainerPage implements OnInit {
  public form!: FormGroup;
  private loadingCtrRef: HTMLIonLoadingElement | undefined;

  constructor(
    private store: Store<GlobalState>,
    private readonly fb: FormBuilder,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.buildForm();
    this.watchWhenContainerCreated();
  }

  public addContainer() {
    if (this.form.valid) {
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Creating a container...' })
        .then((loadingEl) => {
          this.loadingCtrRef = loadingEl;
          loadingEl.present();
          this.store.dispatch(
            RoomActions.addContainer({ dto: { ...this.form.value } })
          );
        });
    }
  }

  private watchWhenContainerCreated() {
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
