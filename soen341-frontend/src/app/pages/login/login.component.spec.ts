import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../../services/services/authentication.service';
import { TokenService } from '../../services/token/token.service';
import { UserService } from '../../services/userService.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';

class MockAuthService {
  authenticate() {
    return of({ token: 'mockToken' });
  }
}

class MockTokenService {
  token = '';
}

class MockUserService {
  setLoginUser() { }
}

class MockRouter {
  navigate() { }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let tokenService: TokenService;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, CommonModule, FormsModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthService },
        { provide: TokenService, useClass: MockTokenService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    tokenService = TestBed.inject(TokenService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty authRequest', () => {
    expect(component.authRequest).toEqual({ email: '', password: '' });
  });

  it('should navigate to register when register() is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.register();
    expect(navigateSpy).toHaveBeenCalledWith(['register']);
  });

  it('should not authenticate if email or password is missing', () => {
    component.authRequest = { email: '', password: '' };
    const authSpy = spyOn(authService, 'authenticate');
    component.login();
    expect(authSpy).not.toHaveBeenCalled();
    expect(component.errorMsg).toContain("Email is required.");
    expect(component.errorMsg).toContain("Password is required.");
  });

  it('should not authenticate if email format is invalid', () => {
    component.authRequest = { email: 'invalidemail', password: 'password123' };
    const authSpy = spyOn(authService, 'authenticate');
    component.login();
    expect(authSpy).not.toHaveBeenCalled();
    expect(component.errorMsg).toContain("Email must contain '@'.");
  });

  it('should not authenticate if password is less than 8 characters', () => {
    component.authRequest = { email: 'user@example.com', password: 'short' };
    const authSpy = spyOn(authService, 'authenticate');
    component.login();
    expect(authSpy).not.toHaveBeenCalled();
    expect(component.errorMsg).toContain("Password must be at least 8 characters long.");
  });

  it('should authenticate and navigate to home on successful login', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const setLoginUserSpy = spyOn(userService, 'setLoginUser');
    component.authRequest = { email: 'user@example.com', password: 'validpass123' };

    component.login();

    expect(tokenService.token).toBe('mockToken');
    expect(setLoginUserSpy).toHaveBeenCalledWith(component.authRequest);
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });

  it('should set errorMsg on login failure with validation errors from backend', () => {
    const errorResponse = { error: { validationErrors: ['Invalid email', 'Invalid password'] } };
    spyOn(authService, 'authenticate').and.returnValue(throwError(() => errorResponse));

    component.authRequest = { email: 'user@example.com', password: 'validpass123' };
    component.login();

    expect(component.errorMsg).toEqual(['Invalid email', 'Invalid password']);
    expect(component.loginError).toBe('');
  });

  it('should set loginError on login failure with generic error from backend', () => {
    const errorResponse = { error: { error: 'Login failed. This login is not valid.' } };
    spyOn(authService, 'authenticate').and.returnValue(throwError(() => errorResponse));

    component.authRequest = { email: 'user@example.com', password: 'validpass123' };
    component.login();

    expect(component.loginError).toBe('Login failed. This login is not valid.');
    expect(component.errorMsg).toEqual([]);
  });
});
