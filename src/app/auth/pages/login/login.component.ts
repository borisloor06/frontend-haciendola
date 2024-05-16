import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../auth.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Login } from '../../interfaces/Login';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  validInput(input: string) {
    return (
      this.loginForm.get(input)?.touched && this.loginForm.get(input)?.invalid
    );
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.getRawValue() as Login);
  }
}
