import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, SignupRequest, JwtResponse } from '../models/user.model';

const API_URL = 'http://localhost:8080/api/auth';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem(USER_KEY) || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_URL}/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem(TOKEN_KEY, response.token);
          localStorage.setItem(USER_KEY, JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
      })
    );
  }

  signup(request: SignupRequest): Observable<any> {
    return this.http.post(`${API_URL}/signup`, request);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user && user.roles && user.roles.includes(role);
  }
}
