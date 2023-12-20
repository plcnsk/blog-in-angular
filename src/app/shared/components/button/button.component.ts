import {Component, Input} from "@angular/core";
import {ButtonType, ButtonVariant} from "./interfaces/button.interface";

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
})
export class ButtonComponent {
  @Input() type: ButtonType = 'button';
  @Input() variant: ButtonVariant = 'tertiary';
  @Input() disabled = false;
}
