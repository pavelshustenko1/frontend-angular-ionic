import { Component, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorConnectorComponent } from '../../classes/control-value-accessor-connector';

@Component({
  selector: 'app-custom-form-control',
  templateUrl: './custom-form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomFormControlComponent,
    },
  ],
})
export class CustomFormControlComponent extends ControlValueAccessorConnectorComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
