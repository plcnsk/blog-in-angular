import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { AuthorisationService } from '../login/services/authorisation/authorisation.service';
import { AuthorisationGuard } from '../login/services/authorisation/guards/authorisation.guard';
import { LabelModule } from '../shared/components/label/label.module';
import { ErrorMessageComponent } from '../shared/components/error-mesage/error-message.component';
import { ErrorMessageModule } from '../shared/components/error-mesage/error-message.module';
import { ButtonModule } from '../shared/components/button/button.module';

@NgModule({
  declarations: [CreatePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LabelModule,
    ErrorMessageModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: DashboardPageComponent,
            canActivate: [AuthorisationGuard],
          },
          {
            path: 'create',
            component: CreatePageComponent,
            canActivate: [AuthorisationGuard],
          },
          {
            path: 'post/:id/edit',
            component: EditPageComponent,
            canActivate: [AuthorisationGuard],
          },
        ],
      },
    ]),
    ButtonModule,
  ],
  exports: [RouterModule],
  providers: [AuthorisationService, AuthorisationGuard],
})
export class AdminModule {}
