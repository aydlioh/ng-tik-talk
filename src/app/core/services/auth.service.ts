import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { environment } from '@environments/environment';
import { LoginRequest } from '@/shared/models/dto/login.dto';
import { TokenResponse } from '@/shared/models/dto/token.dto';

const TOKEN = 'token';
const REFRESH_TOKEN = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  public token: string | null = null;
  public refreshToken: string | null = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get(TOKEN);
    }

    return Boolean(this.token);
  }

  public login(payload: LoginRequest) {
    const formData = new FormData();

    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseUrl}/token`, formData)
      .pipe(
        tap((res) => {
          this.token = res.access_token;
          this.refreshToken = res.refresh_token;
          this.cookieService.set(TOKEN, this.token);
          this.cookieService.set(REFRESH_TOKEN, this.refreshToken);
        })
      );
  }
}
