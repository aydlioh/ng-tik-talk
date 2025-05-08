import { Component, Input } from '@angular/core';
import { SharedModule } from '@/shared/shared.module';
import { Profile } from '@/shared/models/dto/profile.dto';

@Component({
  selector: 'app-profile-card',
  imports: [SharedModule],
  templateUrl: './profile-card.component.html',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
