import { Injectable } from '@angular/core';
import {
  Login,
  LoginResponse,
  Register,
  RegisterResponse,
  validAuth,
} from './interfaces';
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
      this.http.post<LoginResponse>(`${this.URL}/auth/login`, credentials, {
        observe: 'response',
      })
    );
  }

  register(credentials: Register) {
    return firstValueFrom(
      this.http.post<RegisterResponse>(`${this.URL}/user`, credentials, {
        observe: 'response',
      })
    );
  }

  validateToken(token: string) {
    return firstValueFrom(
      this.http.get<validAuth>(`${this.URL}/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        observe: 'response',
      })
    );
  }
}
