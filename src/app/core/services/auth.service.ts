import { catchError, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { LoginRequest } from '@/shared/models/dto/login.dto';
import { TokenResponse } from '@/shared/models/dto/token.dto';
import { Router } from '@angular/router';

const TOKEN = 'token';
const REFRESH_TOKEN = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  public token: string | null = null;
  public refreshToken: string | null = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  public get isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get(TOKEN);
      this.refreshToken = this.cookieService.get(REFRESH_TOKEN);
    }

    return Boolean(this.token);
  }

  public login(payload: LoginRequest): Observable<TokenResponse> {
    const formData = new FormData();

    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseUrl}/token`, formData)
      .pipe(tap((res) => this.saveTokens(res)));
  }

  public logout(): void {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  public refresh(): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.baseUrl}/refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((res) => this.saveTokens(res)),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  private saveTokens(res: TokenResponse): void {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;
    this.cookieService.set(TOKEN, this.token);
    this.cookieService.set(REFRESH_TOKEN, this.refreshToken);
  }
}
