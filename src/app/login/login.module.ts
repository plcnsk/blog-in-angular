import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login.component";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "../shared/components/button/button.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LabelModule} from "../shared/components/label/label.module";
import {
  ErrorMessageModule
} from "../shared/components/error-mesage/error-message.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '', component: LoginComponent
    }
  ]), ButtonModule, ReactiveFormsModule, LabelModule, ErrorMessageModule]
})
export class LoginModule {
}
