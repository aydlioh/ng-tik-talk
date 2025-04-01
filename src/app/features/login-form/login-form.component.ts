import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@/core/services/auth.service';
import { SharedModule } from '@/shared/shared.module';
import { ErrorHandlerService } from '@/core/services/error-handler.service';
import { FormValidationService } from '@/core/services/form-validation.service';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private formValidatorService: FormValidationService,
    private router: Router,
    private destroyRef: DestroyRef
  ) {}

  public pending = signal(false);
  public submitError = signal<string | null>(null);
  public formSubmitted = false;

  public form = new FormGroup<LoginForm>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  public get usernameError(): string {
    return this.formValidatorService.getFieldErrorMessage(
      this.form.controls.username,
      {
        required: 'Имя пользователя обязательно',
      },
      this.formSubmitted
    );
  }

  public get passwordError(): string {
    return this.formValidatorService.getFieldErrorMessage(
      this.form.controls.password,
      {
        required: 'Пароль обязателен',
        minlength: 'Пароль должен быть не менее 6 символов',
      },
      this.formSubmitted
    );
  }

  public onSubmit(): void {
    this.formSubmitted = true;
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.pending.set(true);

    this.authService
      .login(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.handleLoginSuccess(),
        error: (error) => this.handleLoginError(error),
      });
  }

  private handleLoginSuccess(): void {
    this.pending.set(false);
    this.router.navigateByUrl('/');
  }

  private handleLoginError(error: unknown): void {
    this.pending.set(false);
    this.submitError.set(
      this.errorHandlerService.getUserFriendlyMessage(error, {
        default: 'Что-то пошло не так...',
        '401': 'Неверный логин или пароль',
      })
    );
    this.resetErrorAfterTimeout();
  }

  private resetErrorAfterTimeout(): void {
    timer(4000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.submitError.set(null));
  }
}
