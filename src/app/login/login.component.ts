import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginKey} from "./enums/login.enum";
import {ValidatorKey} from "../shared/enums/validators.enum";
import {PASSWORD_MIN_LENGTH} from "./constans/login.constant";
import {VALIDATION_MESSAGES} from "../shared/constants/form.constant";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  readonly loginKey = LoginKey;
  readonly validatorKey = ValidatorKey;
  readonly passwordMinLength = PASSWORD_MIN_LENGTH;
  readonly errorMessages = VALIDATION_MESSAGES;

  ngOnInit() {
    this.initForm();
    this.subscribeToChanges();
  }

  onSubmit() {
    if (this.form.invalid || this.form.disabled) {
      return;
    }
  }

  isControlValid(controlKey: LoginKey): boolean {
    return this.form.controls[controlKey].touched && this.form.controls[controlKey].invalid;
  }

  isErrorExist(controlKey: LoginKey, validatorKey: ValidatorKey) {
    return this.form.controls[controlKey].errors?.[validatorKey];
  }

  private initForm(): void {
    this.form = new FormGroup({
      [LoginKey.Email]: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      [LoginKey.Password]: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
      ]),
    });
  }

  private subscribeToChanges(): void {
    this.form.controls[LoginKey.Password].valueChanges.subscribe(() => {
    });
  }
}
