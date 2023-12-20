import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardPageComponent } from './admin/components/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './admin/components/create-page/create-page.component';
import { EditPageComponent } from './admin/components/edit-page/edit-page.component';
import { HomePageComponent } from './main/components/home-page/home-page.component';
import { MainModule } from './main/main.module';
import { PostComponent } from './main/components/home-page/components/post/post.component';
import { PostPageComponent } from './main/components/post-page/post-page.component';
import { ButtonModule } from './shared/components/button/button.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostPageComponent,
    AdminComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    PostComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MainModule, ButtonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
