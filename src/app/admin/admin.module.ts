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
import { ErrorMessageModule } from '../shared/components/error-mesage/error-message.module';
import { ButtonModule } from '../shared/components/button/button.module';
import { QuillEditorComponent } from 'ngx-quill';
import { SearchPipe } from './components/dashboard-page/pipes/search.pipe';
import { AlertComponent } from './components/alert/alert.component';
import { AlertServices } from './components/alert/services/alert.services';
import { LoadingModule } from '../shared/components/loading/loading.module';

@NgModule({
  declarations: [CreatePageComponent, SearchPipe, EditPageComponent, AlertComponent],
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
    QuillEditorComponent,
    LoadingModule,
  ],
  exports: [RouterModule, SearchPipe, AlertComponent],
  providers: [AuthorisationService, AuthorisationGuard, AlertServices],
})
export class AdminModule {}
