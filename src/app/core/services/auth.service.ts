import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cookieService = inject(CookieService);
  private router = inject(Router);

  setSession(token: string, email: string) {
    this.cookieService.set('auth_token', token);
    this.cookieService.set('user_email', email);
  }

  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('auth_token');
  }

  getUserEmail(): string {
    return this.cookieService.get('user_email');
  }
}