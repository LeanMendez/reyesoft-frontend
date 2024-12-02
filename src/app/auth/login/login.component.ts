import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  @Output() logout = new EventEmitter<void>();

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  errorMessage: string = '';

  get email() {
    return this.form.get('email')?.value;
  }

  get password() {
    return this.form.get('password')?.value;
  }

  ngOnInit(): void {
    if (localStorage.getItem('userName')) {
      this.router.navigate(['/systems']);
    }
  }

  async onSubmit() {
    if (
      this.form.valid &&
      this.form.get('email')?.value &&
      this.form.get('password')?.value
    ) {
      const email = this.form.get('email')?.value as string;
      const password = this.form.get('password')?.value as string;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigateByUrl('/systems');
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
        if (error.status === 422) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.';
        } else {
          this.errorMessage = 'Ocurrió un error al iniciar sesión. Intenta nuevamente.';
        }
        },
      });
    }
  }

  markFieldAsTouched(fieldName: string) {
    const control = this.form.get(fieldName);
    if (control) {
      control.markAsTouched();
    }
  }
}
