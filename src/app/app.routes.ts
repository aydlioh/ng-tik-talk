import { Routes } from '@angular/router';
import { LoginPageComponent } from '@/pages/login-page/login-page.component';
import { ProfilePageComponent } from '@/pages/profile-page/profile-page.component';
import { SearchPageComponent } from '@/pages/search-page/search-page.component';
import { MainLayoutComponent } from '@/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
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
