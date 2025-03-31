import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-profile-card',
  imports: [SharedModule],
  templateUrl: './profile-card.component.html',
})
export class ProfileCardComponent {}
