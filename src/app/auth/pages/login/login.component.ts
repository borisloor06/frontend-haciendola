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
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  validInput(input: string) {
    return (
      this.loginForm.get(input)?.touched && this.loginForm.get(input)?.invalid
    );
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    try {
      const response = await this.authService.login({
        password: this.loginForm.get('password')!.value as string,
        username: this.loginForm.get('email')!.value as string,
      });
      if (response.status === 200) {
        console.log('User logged in');
        console.log(response.body)
        localStorage.setItem('token', response.body!.access_token);
        this.router.navigate(['/dashboard']);
        return;
      }
      console.log('User not logged in')
    } catch (error) {
      console.error(error);
    }
    return;
  }
}
