import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormValidationService {
  public getFieldErrorMessage(
    control: FormControl,
    messages: Record<string, string>,
    submitted: boolean
  ): string {
    if (!control.errors || (!submitted && !control.touched)) return '';

    const errorKey = Object.keys(control.errors)[0];
    return messages[errorKey] || 'Некорректное значение';
  }
}
