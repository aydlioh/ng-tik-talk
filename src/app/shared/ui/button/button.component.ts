import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'outline'
  | 'ghost'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() class = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() clicked = new EventEmitter<Event>();

  get buttonClasses(): string {
    const baseClasses = [
      'cursor-pointer',
      'font-medium',
      'rounded',
      'transition-colors',
      'focus:outline-none',
      'focus:ring-3',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      this.fullWidth ? 'w-full' : 'w-fit',
    ];

    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
      primary:
        'bg-primary text-white hover:bg-primary/90 focus:ring-primary/40',
      secondary:
        'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      success:
        'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      outline:
        'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost:
        'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      link: 'bg-transparent text-primary-600 hover:text-primary-800 underline focus:ring-primary-500',
    };

    return [
      ...baseClasses,
      sizeClasses[this.size],
      variantClasses[this.variant],
      this.loading ? 'opacity-70 cursor-wait' : '',
      this.class,
    ].join(' ');
  }

  onClick(event: Event) {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    } else {
      event.preventDefault();
    }
  }
}
