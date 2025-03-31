import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [SharedModule, FeaturesModule],
})
export class AppComponent {}
