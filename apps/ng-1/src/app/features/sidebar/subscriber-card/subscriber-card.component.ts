import { Profile } from '@/shared/models/dto/profile.dto';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-subscriber-card',
  imports: [SharedModule],
  templateUrl: './subscriber-card.component.html',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
