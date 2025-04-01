import { Routes } from '@angular/router';
import { LoginPageComponent } from '@/pages/login-page/login-page.component';
import { ProfilePageComponent } from '@/pages/profile-page/profile-page.component';
import { SearchPageComponent } from '@/pages/search-page/search-page.component';
import { MainLayoutComponent } from '@/layouts/main-layout/main-layout.component';
import { canActivateAuth } from '@/core/guards/access.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateAuth],
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: SearchPageComponent,
      },

      {
        path: 'profile',
        component: ProfilePageComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
