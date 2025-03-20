import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('TokenService', () => {
  let service: TokenService;
  let jwtHelperSpy: jasmine.SpyObj<JwtHelperService>;

  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIl19.signature';
  const mockDecodedToken = { authorities: ['ROLE_ADMIN', 'ROLE_USER'] };

  beforeEach(() => {
    const jwtSpy = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired', 'decodeToken']);

    TestBed.configureTestingModule({
      providers: [
        TokenService,
        { provide: JwtHelperService, useValue: jwtSpy }
      ]
    });

    service = TestBed.inject(TokenService);
    jwtHelperSpy = TestBed.inject(JwtHelperService) as jasmine.SpyObj<JwtHelperService>;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get token from localStorage', () => {
    service.token = mockToken;
    expect(service.token).toBe(mockToken);
  });

  it('should return false if no token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isTokenValid()).toBeFalse();
  });

  it('should return true if the token is valid', async () => {
    spyOn(localStorage, 'getItem').and.returnValue(mockToken);
    jwtHelperSpy.isTokenExpired.and.returnValue(Promise.resolve(false));

    expect(await service.isTokenValid()).toBeTrue();
  });

  it('should return true for isTokenNotValid if token is invalid', () => {
    spyOn(service, 'isTokenValid').and.returnValue(false);
    expect(service.isTokenNotValid()).toBeTrue();
  });

  it('should return false for isTokenNotValid if token is valid', () => {
    spyOn(service, 'isTokenValid').and.returnValue(true);
    expect(service.isTokenNotValid()).toBeFalse();
  });

  it('should return user roles if token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(mockToken);
    jwtHelperSpy.decodeToken.and.returnValue(mockDecodedToken);
    
    expect(service.userRoles).toEqual(['ROLE_ADMIN', 'ROLE_USER']);
  });

  it('should return an empty array if no token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.userRoles).toEqual([]);
  });
});