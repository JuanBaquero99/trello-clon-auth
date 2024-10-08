import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post(`${this.apiURL}/api/v1/auth/login`, {
      email,
      password
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiURL}/api/v1/auth/register`, {
      name,
      email,
      password
    });
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.http.post(`${this.apiURL}/api/v1/auth/register`, {
      name,
      email,
      password

    }
    ).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string) {
    return this.http.post<{isAvailable: boolean}>(`${this.apiURL}/api/v1/auth/is-available`, {email});
  }

  recovery(email: string) {
    return this.http.post(`${this.apiURL}/api/v1/auth/recovery`, {email});
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiURL}/api/v1/auth/change-password`, { token, newPassword });
  }
}
