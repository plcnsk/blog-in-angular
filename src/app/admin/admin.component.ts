import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss'],
})
export class AdminComponent {
  constructor(private router: Router) {}

  logout(event: Event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }
}
