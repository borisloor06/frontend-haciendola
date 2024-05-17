import { Injectable } from '@angular/core';
import { Login, Register } from './interfaces/Login';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  login(credentials: Login) {
    return firstValueFrom(
      this.http.post(`${this.URL}/auth/login`, credentials)
    );
  }

  register(credentials: Register) {
    return firstValueFrom(
      this.http.post(`${this.URL}/user`, credentials)
    );
  }
}
