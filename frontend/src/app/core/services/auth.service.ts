import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../models';

export interface LoginResponse {
  token: string;
  user: User;
}

const TOKEN_KEY = 'sp_token';
const USER_KEY = 'sp_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiBase = environment.apiBase;

  private user$$ = new BehaviorSubject<User | null>(this.restoreUser());
  readonly user$ = this.user$$.asObservable();

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  get currentUser(): User | null {
    return this.user$$.value;
  }

  login(username: string, password: string): Observable<LoginResponse> {
    if (environment.demo) {
      const ok =
        username.trim().toLowerCase() === environment.demoCredentials.username &&
        password === environment.demoCredentials.password;
      if (!ok) {
        return throwError(() => new Error('Username atau kata sandi salah.')).pipe(delay(700));
      }
      const user: User = {
        id: 'u-001',
        username,
        fullName: 'Rizky Pratama',
        email: 'rizky.pratama@visionet.co.id',
        referralCode: 'SP-RZK2041',
        role: 'AGENT',
        active: true,
      };
      const res: LoginResponse = { token: 'demo.jwt.' + Date.now(), user };
      return of(res).pipe(
        delay(800),
        tap((r) => this.persistSession(r)),
      );
    }
    return this.http
      .post<LoginResponse>(`${this.apiBase}/auth/login`, { username, password })
      .pipe(tap((r) => this.persistSession(r)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.user$$.next(null);
  }

  restoreSession(): User | null {
    return this.user$$.value;
  }

  private persistSession(res: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    this.user$$.next(res.user);
  }

  private restoreUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }
}
