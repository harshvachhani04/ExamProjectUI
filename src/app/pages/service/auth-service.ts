import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_API_URL = environment.apiBaseUrl;
  private readonly AUTH_API = `${this.BASE_API_URL}/Auth`;

  isAuthenticated = signal<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post(
      `${this.AUTH_API}/login?username=${username}&password=${password}`,
      {},
      { responseType: 'text' }
    ).pipe(
      tap(token => {
        this.storeToken(token);
        this.isAuthenticated.set(true);
      })
    );
  }

  
  private storeToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticated.set(false);
    this.router.navigate(['auth/login']);
  }

  getAuthHeader(): string | null {
    const token = this.getToken();
    return token ? `Bearer ${token}` : null;
  }
}