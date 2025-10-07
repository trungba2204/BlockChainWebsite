import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./pages/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent)
  },
  {
    path: 'careers',
    loadComponent: () => import('./pages/careers/careers.component').then(m => m.CareersComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'blogs',
        loadComponent: () => import('./pages/admin/blog-management/blog-management.component').then(m => m.BlogManagementComponent)
      },
      {
        path: 'projects',
        loadComponent: () => import('./pages/admin/project-management/project-management.component').then(m => m.ProjectManagementComponent)
      },
      {
        path: 'team',
        loadComponent: () => import('./pages/admin/team-management/team-management.component').then(m => m.TeamManagementComponent)
      },
      {
        path: 'careers',
        loadComponent: () => import('./pages/admin/career-management/career-management.component').then(m => m.CareerManagementComponent)
      },
      {
        path: 'contacts',
        loadComponent: () => import('./pages/admin/contact-management/contact-management.component').then(m => m.ContactManagementComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
