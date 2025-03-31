import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@NgModule({
  declarations: [],
  exports: [ProfileCardComponent],
  imports: [CommonModule, ProfileCardComponent],
})
export class FeaturesModule {}
