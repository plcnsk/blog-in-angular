import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorisationService } from '../login/services/authorisation/authorisation.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss'],
})
export class AdminComponent {
  constructor(
    private router: Router,
    private authorisation: AuthorisationService,
  ) {}

  logout(event: Event) {
    event.preventDefault();
    this.authorisation.logout();
    this.router.navigate(['login']);
  }
}
