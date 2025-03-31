import { Component } from '@angular/core';
import { SharedModule } from '@/shared/shared.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [SharedModule, RouterOutlet],
})
export class AppComponent {}
