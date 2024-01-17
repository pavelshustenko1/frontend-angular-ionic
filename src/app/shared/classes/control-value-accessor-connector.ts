import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
} from '@angular/forms';
import {
  ElementRef,
  Injector,
  Input,
  ViewChild,
  Component,
} from '@angular/core';

@Component({
  template: '',
})
export class ControlValueAccessorConnectorComponent
  implements ControlValueAccessor
{
  @ViewChild(FormControlDirective, { static: true }) formControlDirective:
    | FormControlDirective
    | undefined;

  @ViewChild('field', { static: true }) field: ElementRef | undefined;

  @Input() formControl!: FormControl;

  @Input() formControlName!: string;

  @Input() selectValues?: { value: string; key: string }[];

  @Input() type = 'text';

  @Input() initial = '';

  @Input() mask: string = '';

  @Input() label: string = '';

  @Input() labelClass: string = '';

  @Input() inputClass: string = '';

  @Input() placeholder!: string;

  @Input() errorRequiredMsg: string | undefined;

  @Input() errorEmailMsg: string | undefined;

  @Input() mandatory: boolean = false;

  @Input() multi: boolean = false;

  constructor(private injector: Injector) {}

  registerOnTouched(fn: any): void {
    this.formControlDirective!.valueAccessor!.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective!.valueAccessor!.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective!.valueAccessor!.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective!.valueAccessor!.setDisabledState!(isDisabled);
  }

  //   GETTERS

  get control(): FormControl {
    return (
      this.formControl ||
      (this.controlContainer.control?.get(this.formControlName!) as FormControl)
    );
  }

  get controlContainer(): ControlContainer {
    return this.injector.get(ControlContainer);
  }
}
