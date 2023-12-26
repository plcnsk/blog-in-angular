import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorisationService } from '../authorisation.service';

@Injectable()
export class AuthorisationGuard implements CanActivate {
  constructor(
    private auth: AuthorisationService,
    private router: Router,
  ) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated) {
      return true;
    } else {
      this.auth.logout();

      this.router.navigate(['login'], {
        queryParams: {
          loginAgain: true,
        },
      });

      return false;
    }
  }
}
