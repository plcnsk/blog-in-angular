import {NgModule} from "@angular/core";
import {ButtonComponent} from "./button.component";
import {NgClass} from "@angular/common";

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    NgClass
  ],
  exports: [
    ButtonComponent
  ]
})
export class ButtonModule {

}
