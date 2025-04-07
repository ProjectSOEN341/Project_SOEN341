import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CodeInputModule } from 'angular-code-input';
import { AuthenticationService } from '../../services/services/authentication.service';
import { ActivateAccountComponent } from './activate-account.component';
import { CommonModule } from '@angular/common';

describe('ActivateAccountComponent', () => {
  let component: ActivateAccountComponent;
  let fixture: ComponentFixture<ActivateAccountComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['confirm']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, CodeInputModule, HttpClientModule, ActivateAccountComponent], // Import the standalone component
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm account successfully', () => {
    authServiceSpy.confirm.and.returnValue(of(undefined));

    component.onCodeCompleted('valid-token');

    expect(authServiceSpy.confirm).toHaveBeenCalledOnceWith({ token: 'valid-token' });
    expect(component.message).toBe('Your account has been successfully activated.\nNow you can proceed to login');
    expect(component.submitted).toBeTrue();
    expect(component.isOkay).toBeTrue();
  });

  it('should handle token confirmation failure', () => {
    authServiceSpy.confirm.and.returnValue(throwError(() => new Error('Invalid token')));

    component.onCodeCompleted('invalid-token');

    expect(authServiceSpy.confirm).toHaveBeenCalledOnceWith({ token: 'invalid-token' });
    expect(component.message).toBe('Token has been expired or invalid');
    expect(component.submitted).toBeTrue();
    expect(component.isOkay).toBeFalse();
  });

  it('should navigate to login page', () => {
    component.redirectToLogin();

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['login']);
  });
});

