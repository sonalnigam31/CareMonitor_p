import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { MockApiService } from '../../../core/services/mock-api.service';
import { AuthService } from '../../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let apiService: jasmine.SpyObj<MockApiService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('MockApiService', ['login']);
    const authSpy = jasmine.createSpyObj('AuthService', ['setSession']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: MockApiService, useValue: apiSpy },
        { provide: AuthService, useValue: authSpy },
        provideRouter([{ path: 'dashboard', component: class Dummy {} }])
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    apiService = TestBed.inject(MockApiService) as jasmine.SpyObj<MockApiService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  // -----------------------------
  // ✔ Component Creation
  // -----------------------------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -----------------------------
  // ✔ Form Validation
  // -----------------------------
  it('should have invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate form with email and password', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: '123456'
    });

    expect(component.loginForm.valid).toBeTrue();
  });

  // -----------------------------
  // ✔ Successful Login Flow
  // -----------------------------
  it('should call apiService.login and navigate on success', () => {
    const mockResponse = {
      token: 'dummyToken',
      user: { email: 'test@example.com' }
    };

    // Mock the API call
    apiService.login.and.returnValue(of(mockResponse));
    const navigateSpy = spyOn(router, 'navigate');

    component.loginForm.setValue({
      email: 'test@example.com',
      password: '123456'
    });

    component.onSubmit();

    expect(apiService.login).toHaveBeenCalledWith('test@example.com', '123456');
    expect(authService.setSession).toHaveBeenCalledWith('dummyToken', 'test@example.com');
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
    expect(component.isLoading()).toBeTrue();
  });

  // -----------------------------
  // ✔ Error Handling
  // -----------------------------
  it('should set errorMessage and stop loading on error', () => {
    apiService.login.and.returnValue(
      throwError(() => ({ message: 'Invalid credentials' }))
    );

    component.loginForm.setValue({
      email: 'wrong@example.com',
      password: 'badpass'
    });

    component.onSubmit();

    expect(apiService.login).toHaveBeenCalled();
    expect(component.errorMessage()).toBe('Invalid credentials');
    expect(component.isLoading()).toBeFalse();
  });

  // -----------------------------
  // ✔ Should NOT submit if form is invalid
  // -----------------------------
  it('should not call login if form is invalid', () => {
    component.loginForm.setValue({
      email: '',
      password: ''
    });

    component.onSubmit();

    expect(apiService.login).not.toHaveBeenCalled();
    expect(component.isLoading()).toBeFalse();
  });
});
