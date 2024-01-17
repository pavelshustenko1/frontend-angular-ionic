import { OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: '',
})
export class CustomDestroyComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
