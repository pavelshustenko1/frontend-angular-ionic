import { Component } from '@angular/core';
import { GlobalState } from './reducers';
import { Store } from '@ngrx/store';
import { selectHttpError } from './core/store/ui/ui.selectors';
import { CustomDestroyComponent } from './shared/classes/custom-destroy';
import { Observable, takeUntil, tap } from 'rxjs';
import { UIActions } from './core/store/ui/ui.actions';
import { AuthActions } from './pages/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends CustomDestroyComponent {
  public error$: Observable<string> | undefined;

  constructor(private readonly store: Store<GlobalState>) {
    super();
  }

  public ngOnInit() {
    this.error$ = this.store.select(selectHttpError).pipe(
      takeUntil(this.destroy$),
      tap((error) => {
        if (error) {
          this.removeErrorIn5sec();
        }
      })
    );
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  private removeErrorIn5sec() {
    setTimeout(() => {
      this.store.dispatch(UIActions.removeHttpError());
    }, 5000);
  }
}
