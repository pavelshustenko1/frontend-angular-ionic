import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../reducers';
import { AuthActions } from '../store/auth.actions';
import { LoadingController } from '@ionic/angular';
import { selectIsAuthenticated } from '../store/auth.selectors';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public authForm!: FormGroup;
  private loadingCtrRef: HTMLIonLoadingElement | undefined;

  constructor(
    private store: Store<GlobalState>,
    private readonly fb: FormBuilder,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.buildAuthForm();
    this.watchIfAuthenticated();
  }

  public login() {
    if (this.authForm.valid) {
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging in...' })
        .then((loadingEl) => {
          this.loadingCtrRef = loadingEl;
          loadingEl.present();
          this.store.dispatch(
            AuthActions.signin({ credentials: { ...this.authForm.value } })
          );
        });
    }
  }

  private watchIfAuthenticated() {
    this.store
      .select(selectIsAuthenticated)
      .pipe(
        filter((x) => !!x),
        take(1)
      )
      .subscribe(() => {
        this.loadingCtrRef?.dismiss();
      });
  }

  private buildAuthForm(): void {
    this.authForm = this.fb.group({
      email: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    });
  }
}
