import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from '../app/features/login/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { 
        path: '', // Default dashboard view
        loadComponent: () => import('./features/list/list.component').then(m => m.ListComponent) 
      },
      { 
        path: 'list', // Explicit list view
        loadComponent: () => import('./features/list/list.component').then(m => m.ListComponent) 
      }
    ]
  }
];