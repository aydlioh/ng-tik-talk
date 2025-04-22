import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@/features/sidebar/sidebar.component';
import { ProfileService } from '@/core/services/profile.service';

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  public profileService = inject(ProfileService);

  ngOnInit() {
    this.profileService.getMe().subscribe(console.log);
  }
}
