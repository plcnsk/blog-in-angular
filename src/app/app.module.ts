import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardPageComponent } from './admin/components/dashboard-page/dashboard-page.component';
import { EditPageComponent } from './admin/components/edit-page/edit-page.component';
import { HomePageComponent } from './main/components/home-page/home-page.component';
import { MainModule } from './main/main.module';
import { PostComponent } from './main/components/home-page/components/post/post.component';
import { PostPageComponent } from './main/components/post-page/post-page.component';
import { ButtonModule } from './shared/components/button/button.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMessageModule } from './shared/components/error-mesage/error-message.module';
import { FormsModule } from '@angular/forms';
import { LabelModule } from './shared/components/label/label.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostPageComponent,
    AdminComponent,
    DashboardPageComponent,
    EditPageComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    ButtonModule,
    HttpClientModule,
    ErrorMessageModule,
    FormsModule,
    LabelModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
