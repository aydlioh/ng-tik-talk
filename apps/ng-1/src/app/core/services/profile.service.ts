import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Profile } from '@/shared/models/dto/profile.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = `${environment.apiUrl}/account`;

  constructor(private http: HttpClient) {}

  public getTestAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseUrl}/test_accounts`);
  }

  public getMe(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/me`);
  }
}
