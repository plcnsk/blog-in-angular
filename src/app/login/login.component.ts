import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginKey } from './enums/login.enum';
import { ValidatorKey } from '../shared/enums/validators.enum';
import { PASSWORD_MIN_LENGTH } from './constans/login.constant';
import { VALIDATION_MESSAGES } from '../shared/constants/form.constant';
import { Credentials } from './interface/login.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthorisationService } from './services/authorisation/authorisation.service';
import { filter, finalize, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  message = '';

  readonly loginKey = LoginKey;
  readonly validatorKey = ValidatorKey;
  readonly passwordMinLength = PASSWORD_MIN_LENGTH;
  readonly errorMessages = VALIDATION_MESSAGES;

  constructor(
    public authorisation: AuthorisationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscribeToQueryParams();
    this.initForm();
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.disabled) {
      return;
    }

    this.isLoading = true;

    const credentials: Credentials = this.form.getRawValue();

    this.authorisation
      .login$(credentials)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
      });
  }

  isControlValid(controlKey: LoginKey): boolean {
    const control = this.form.controls[controlKey];
    return control.touched && control.invalid;
  }

  isErrorExist(controlKey: LoginKey, validatorKey: ValidatorKey) {
    return this.form.controls[controlKey].errors?.[validatorKey];
  }

  private subscribeToQueryParams(): void {
    this.route.queryParams
      .pipe(
        take(1),
        filter((params: Params) => params['loginAgain']),
      )
      .subscribe(() => {
        this.message = 'Please, enter yours data';
      });
  }

  private initForm(): void {
    this.form = new FormGroup({
      [LoginKey.Email]: new FormControl(null, [Validators.required, Validators.email]),
      [LoginKey.Password]: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
      ]),
    });
  }
}
