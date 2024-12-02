import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let testingAuthServiceMock: jasmine.SpyObj<AuthService>;
  let testingRouterMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    testingAuthServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    testingRouterMock = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: testingAuthServiceMock },
        { provide: Router, useValue: testingRouterMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validations', () => {
    it('should disable submit buton when form is invalid', () => {
      component.form.setValue({
        email: 'pepito-no-sabe-escribir-su-correo',
        password: '12345'
      });
      fixture.detectChanges();

      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBeTruthy();
    });

    it('should enable submit button when form is valid', () => {
      component.form.setValue({
        email: 'admin@saldo.com',
        password: '123456'
      });
      fixture.detectChanges();

      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBeFalsy();
    });
  });


  describe('Login Process', () => {
    it('should call login in the authservice and navigate to /systems on success', () => {
      const testingUser = { 
        id: '1', 
        email: 'admin@saldo.com', 
        name: 'Admin de Saldo' 
      };
      testingAuthServiceMock.login.and.returnValue(of(testingUser));

      component.form.setValue({
        email: 'admin@saldo.com',
        password: 'password123'
      });
      
      component.onSubmit();

      expect(testingAuthServiceMock.login).toHaveBeenCalledWith('admin@saldo.com', 'password123');
      
      expect(testingRouterMock.navigateByUrl).toHaveBeenCalledWith('/systems');
    });
  });


  describe('Field Validation', () => {
    it('should mark email field as touched when blurred', () => {
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      const email = component.form.get('email');
      expect(email?.touched).toBeTruthy();
    });

    it('should mark password field as touched when blurred', () => {
      const passwordInput = fixture.nativeElement.querySelector('#password');
      passwordInput.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      const password = component.form.get('password');
      expect(password?.touched).toBeTruthy();
    });
  });
});