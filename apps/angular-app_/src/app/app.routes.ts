import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Protected } from './protected/protected';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'protected', component: Protected, canActivate: [authGuard]    }
];
