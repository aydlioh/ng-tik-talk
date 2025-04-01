import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type InputVariant = 'default' | 'filled' | 'flushed';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() inputClass = '';
  @Input() containerClass = '';
  @Input() variant: InputVariant = 'default';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() label = '';
  @Input() error?: string  = '';
  @Input() helperText = '';
  @Input() required = false;
  @Input() name = '';
  @Input() id = '';

  value = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  get containerClasses(): string {
    return ['flex', 'flex-col', 'gap-1', this.containerClass].join(' ');
  }

  get inputClasses(): string {
    const baseClasses = [
      'block',
      'w-full',
      'rounded',
      'border-[1px]',
      'px-3',
      'py-2',
      'focus:outline-none',
      'focus:ring-4',
      'transition-colors',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
    ];

    const variantClasses = {
      default: 'border-gray-300 focus:border-primary focus:ring-primary/20',
      filled:
        'bg-gray-50 border-gray-300 focus:border-primary focus:ring-primary',
      flushed:
        'border-b-2 border-gray-300 bg-transparent focus:border-primary rounded-none px-0',
    };

    const errorClasses = this.error
      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
      : '';

    return [
      ...baseClasses,
      variantClasses[this.variant],
      errorClasses,
      this.inputClass,
    ].join(' ');
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
