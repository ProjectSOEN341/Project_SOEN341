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

  it('should show both required errors when email and password are empty', () => {
    component.authRequest = { email: '', password: '' };
    component.login();
    expect(component.errorMsg).toContain("Email is required.");
    expect(component.errorMsg).toContain("Password is required.");
    expect(component.loginError).toBe('');
  });

  it('should show email required error only when email is missing', () => {
    component.authRequest = { email: '', password: 'somepass' };
    component.login();
    expect(component.errorMsg).toContain("Email is required.");
    expect(component.errorMsg).not.toContain("Password is required.");
    expect(component.loginError).toBe('');
  });

  it('should show password required error only when password is missing', () => {
    component.authRequest = { email: 'user@example.com', password: '' };
    component.login();
    expect(component.errorMsg).toContain("Password is required.");
    expect(component.errorMsg).not.toContain("Email is required.");
    expect(component.loginError).toBe('');
  });

  it('should show generic login error on failed login', () => {
    const errorResponse = { error: { error: 'Invalid login.' } };
    spyOn(authService, 'authenticate').and.returnValue(throwError(() => errorResponse));

    component.authRequest = { email: 'user@example.com', password: 'wrongpass' };
    component.login();

    expect(component.errorMsg.length).toBe(0);
    expect(component.loginError).toBe("Invalid email or password.");
  });

  it('should login successfully with correct credentials', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const setLoginUserSpy = spyOn(userService, 'setLoginUser');

    component.authRequest = { email: 'user@example.com', password: 'correctpass' };
    component.login();

    expect(tokenService.token).toBe('mockToken');
    expect(setLoginUserSpy).toHaveBeenCalledWith(component.authRequest);
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
    expect(component.loginError).toBe('');
    expect(component.errorMsg.length).toBe(0);
  });
});
