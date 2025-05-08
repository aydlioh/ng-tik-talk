import { Component } from '@angular/core';
import { SharedModule } from '@/shared/shared.module';
import { LoginFormComponent } from '@/features/login-form/login-form.component';

@Component({
  imports: [SharedModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {}
