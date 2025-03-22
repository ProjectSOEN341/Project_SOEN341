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
    expect(component.registerRequest).toEqual({ email: '', firstname: '', lastname: '', password: '' });
  });

  it('should navigate to login when login() is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.login();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('should set errorMsg on registration failure', () => {
    const errorResponse = { error: { validationErrors: ['First name is required.', 'Last name is required.',"Email is required.","Password is required."] } };
    spyOn(authService, 'register').and.returnValue(throwError(() => errorResponse));

    component.register();

    expect(component.errorMsg).toEqual(['First name is required.', 'Last name is required.',"Email is required.","Password is required."]);
  });
});
