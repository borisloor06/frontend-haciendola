import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Register } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    username: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  validInput(input: string) {
    return (
      this.registerForm.get(input)?.touched &&
      this.registerForm.get(input)?.invalid
    );
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    try {
      const response = await this.authService.register(
        this.registerForm.getRawValue() as Register
      );
      if (response.status === 201) {
        console.log('User created');
        this.router.navigate(['/auth/login']);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
