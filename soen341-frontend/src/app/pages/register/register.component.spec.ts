import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthenticationService } from '../../services/services/authentication.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

class MockAuthService {
  register() {
    return of({});
  }
}

class MockRouter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  navigate() {}
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, CommonModule, FormsModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty registration request', () => {
    expect(component.registerRequest).toEqual({
      email: '',
      firstname: '',
      lastname: '',
      password: ''
    });
  });

  it('should navigate to login when login() is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.login();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('should show required field errors for empty inputs', () => {
    component.registerRequest = { email: '', firstname: '', lastname: '', password: '' };
    component.register();

    expect(component.errorMsg).toContain('First name is required.');
    expect(component.errorMsg).toContain('Last name is required.');
    expect(component.errorMsg).toContain('Email is required.');
    expect(component.errorMsg).toContain('Password is required.');
  });

  it('should show error when email is missing @ symbol', () => {
    component.registerRequest = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'invalidemail',
      password: 'validpass123'
    };
    component.register();

    expect(component.errorMsg).toContain("Email must contain '@'.");
  });

  it('should show error when password is less than 8 characters', () => {
    component.registerRequest = {
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane@example.com',
      password: 'short'
    };
    component.register();

    expect(component.errorMsg).toContain('Password must be at least 8 characters long.');
  });

  it('should not proceed to backend if there are validation errors', () => {
    const authSpy = spyOn(authService, 'register');
    component.registerRequest = {
      firstname: '',
      lastname: '',
      email: 'invalidemail',
      password: '123'
    };
    component.register();

    expect(authSpy).not.toHaveBeenCalled();
    expect(component.errorMsg.length).toBeGreaterThan(0);
  });

  it('should proceed to backend and navigate on successful register', () => {
    const authSpy = spyOn(authService, 'register').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');

    component.registerRequest = {
      firstname: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'password123'
    };

    component.register();

    expect(authSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['activate-account']);
  });

  it('should set registerError on generic backend error', () => {
    const errorResponse = { error: { message: 'Something went wrong.' } };
    spyOn(authService, 'register').and.returnValue(throwError(() => errorResponse));

    component.registerRequest = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      password: 'validpass123'
    };

    component.register();

    expect(component.registerError).toBe('Something went wrong.');
  });
});
