import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'frq', loadComponent: () => import('./pages/frq/frq.component').then(m => m.FrqComponent) },

  { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  { path: 'service/:id', loadComponent: () => import('./pages/service/service.component').then(m => m.ServiceComponent) },

  { path: 'login', canActivate: [loginGuard],loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', canActivate: [loginGuard],loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },

  {
    path: 'client', canActivate: [authGuard], loadComponent: () => import('./pages/client/client.component').then(m => m.ClientComponent),
    children: [

      { path: '', loadComponent: () => import('./pages/client/stats/stats.component').then(m => m.StatsComponent) },
      { path: 'profile', loadComponent: () => import('./pages/client/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'my-services', loadComponent: () => import('./pages/client/my-services/my-services.component').then(m => m.MyServicesComponent) },
      { path: 'proposals', loadComponent: () => import('./pages/client/proposals/proposals.component').then(m => m.ProposalsComponent) },
      { path: 'service-proposals/:id' ,loadComponent: () => import('./pages/client/service-proposals/service-proposals.component').then(m => m.ServiceProposalsComponent) },
      { path: 'post', loadComponent: () => import('./pages/client/post/post.component').then(m => m.PostComponent) },

    ]}

];
