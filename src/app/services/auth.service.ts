import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment?.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, data);
  }
  forgetPassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/forgotPasswords`, data);
  }
  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, data);
  }

}
