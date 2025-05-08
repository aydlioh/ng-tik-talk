import { Component } from '@angular/core';
import { SharedModule } from '@/shared/shared.module';
import { ProfileService } from '@/core/services/profile.service';
import { ProfileCardComponent } from '@/features/profile-card/profile-card.component';
import { Profile } from '@/shared/models/dto/profile.dto';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  imports: [SharedModule, ProfileCardComponent],
})
export class SearchPageComponent {
  profiles: Profile[] = [];

  constructor(private profileService: ProfileService) {
    this.profileService.getTestAccounts().subscribe((data) => {
      this.profiles = data;
    });
  }
}
