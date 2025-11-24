import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MockApiService } from '../../../core/services/mock-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" placeholder="admin@test.com">
              <mat-error *ngIf="loginForm.get('email')?.invalid">Invalid email</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" placeholder="password">
            </mat-form-field>

            <div *ngIf="errorMessage()" class="error-msg">{{ errorMessage() }}</div>

            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="loginForm.invalid || isLoading()">
              {{ isLoading() ? 'Logging in...' : 'Login' }}
            </button>
          </form>
          <div *ngIf="isLoading()" class="spinner-container">
             <mat-spinner diameter="30"></mat-spinner>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5; }
    mat-card { width: 400px; padding: 20px; }
    .full-width { width: 100%; margin-bottom: 10px; }
    .error-msg { color: red; margin-bottom: 10px; }
    .spinner-container { display: flex; justify-content: center; margin-top: 10px; }
  `]
})
export class LoginComponent {
  fb = inject(FormBuilder);
  apiService = inject(MockApiService);
  authService = inject(AuthService);
  router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      const { email, password } = this.loginForm.value;
      
      this.apiService.login(email!, password!).subscribe({
        next: (res) => {
          this.authService.setSession(res.token, res.user.email);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Login failed');
          this.isLoading.set(false);
        }
      });
    }
  }
}