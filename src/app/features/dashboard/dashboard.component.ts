import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>My App</span>
      <span class="spacer"></span>
      <span class="welcome">Welcome, {{ userEmail }}</span>
      <button mat-button routerLink="/dashboard/list">List</button>
      <button mat-icon-button (click)="logout()">
         Logout
      </button>
    </mat-toolbar>
    <div class="content">
      <router-outlet></router-outlet> </div>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .welcome { margin-right: 20px; font-size: 0.9rem; }
    .content { padding: 20px; }
  `]
})
export class DashboardComponent {
  authService = inject(AuthService);
  userEmail = this.authService.getUserEmail();

  logout() {
    this.authService.logout();
  }
}