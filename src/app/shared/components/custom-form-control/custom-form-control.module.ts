import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormControlComponent } from './custom-form-control.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomFormControlComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CustomFormControlComponent],
})
export class CustomFormControlModule {}
