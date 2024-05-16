import { Injectable } from '@angular/core';
import { Login, Register } from './interfaces/Login';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(credentials: Login) {
    return firstValueFrom(
      this.http.post(`${this.url}/auth/login`, credentials)
    );
  }

  register(credentials: Register) {
    return firstValueFrom(
      this.http.post(`${this.url}/user/register`, credentials)
    );
  }
}
