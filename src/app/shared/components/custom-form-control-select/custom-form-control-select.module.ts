import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormControlSelectComponent } from './custom-form-control-select.component';

@NgModule({
  declarations: [CustomFormControlSelectComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CustomFormControlSelectComponent],
})
export class CustomFormControlSelectModule {}
