import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Credentials } from '../../interface/login.interface';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { AuthResponse } from '../../../shared/interfaces/interface';
import {
  AUTH_ERROR_MESSAGES,
  AUTH_ROUTE,
  EXPIRES_TOKEN_KEY,
  TOKEN_KEY,
} from './constants/authorisation.constant';
import { AuthErrorKey } from './interfaces/authorisation.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorisationService {
  error$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expDateInString = localStorage.getItem(EXPIRES_TOKEN_KEY);

    if (!expDateInString) {
      return null;
    }

    const expiresDate = new Date(expDateInString);

    if (new Date() > expiresDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem(TOKEN_KEY);
  }

  login$(credentials: Credentials): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(AUTH_ROUTE, { ...credentials, returnSecureToken: true })
      .pipe(
        tap(this.setToken),
        catchError(error => this.handleError(error)),
      );
  }

  logout(): void {
    this.setToken(null);
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      const expiresInDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem(TOKEN_KEY, response.idToken);
      localStorage.setItem(EXPIRES_TOKEN_KEY, expiresInDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    const errorKey = message as AuthErrorKey;

    this.error$.next(AUTH_ERROR_MESSAGES[errorKey]);

    return throwError(() => error);
  }
}
