import { Component, Injector, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorConnectorComponent } from '../../classes/control-value-accessor-connector';

@Component({
  selector: 'app-custom-form-control-select',
  templateUrl: './custom-form-control-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomFormControlSelectComponent),
    },
  ],
})
export class CustomFormControlSelectComponent extends ControlValueAccessorConnectorComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
