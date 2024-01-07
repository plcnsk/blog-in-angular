import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthorisationService } from '../../login/services/authorisation/authorisation.service';
import { Router } from '@angular/router';
import { HttpRequestStatus } from '../enums/http-request-status.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthorisationService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.token;

    if (token) {
      req = req.clone({
        setParams: {
          auth: token,
        },
      });
    }

    return next.handle(req).pipe(
      tap(() => console.log('Interceptor')),
      catchError<any, any>((error: HttpErrorResponse) => {
        if (error.status === HttpRequestStatus.AnAuthorized) {
          this.auth.logout();
          this.router.navigate(['login'], {
            queryParams: {
              authFailed: true,
            },
          });
        }

        return throwError(() => error);
      }),
    );
  }
}
