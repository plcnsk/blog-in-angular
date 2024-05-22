import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginKey } from './enums/login.enum';
import { ValidatorKey } from '../shared/enums/validators.enum';
import { PASSWORD_MIN_LENGTH } from './constans/login.constant';
import { Credentials } from './interface/login.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorisationService } from './services/authorisation/authorisation.service';
import { finalize, take } from 'rxjs';
import { CustomValidators } from '../shared/validators/validators';
import { FormExtension } from '../shared/utils/form-extension.util';
import { VALIDATION_MESSAGES } from '../shared/constants/form.constant';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent extends FormExtension<LoginKey> implements OnInit {
  isLoading = false;
  message = '';

  readonly loginKey = LoginKey;

  constructor(
    public authorisation: AuthorisationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeToQueryParams();
    this.initForm();
    this.setErrorState();
  }

  onSubmit(): void {
    if (!this.isSubmittable) {
      return;
    }

    this.isLoading = true;

    const credentials: Credentials = this.form!.getRawValue();

    this.authorisation
      .login$(credentials)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(() => {
        this.form!.reset();
        this.router.navigate(['/admin', 'dashboard']);
      });
  }

  private subscribeToQueryParams(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params['loginAgain']) {
        this.message = 'Please login!';
      } else if (params['authFailed']) {
        this.message = 'Yours session has been expired, please login again';
      }
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      [LoginKey.Email]: new FormControl(null, [
        Validators.required,
        CustomValidators.email(),
      ]),
      [LoginKey.Password]: new FormControl(null, [
        Validators.required,
        Validators.minLength(PASSWORD_MIN_LENGTH),
        CustomValidators.password(),
      ]),
    });
  }

  private setErrorState(): void {
    this.errorState = {
      [LoginKey.Email]: {
        [ValidatorKey.Required]: VALIDATION_MESSAGES[ValidatorKey.Required],
        [ValidatorKey.Email]: VALIDATION_MESSAGES[ValidatorKey.Email],
      },
      [LoginKey.Password]: {
        [ValidatorKey.Required]: VALIDATION_MESSAGES[ValidatorKey.Required],
        [ValidatorKey.MinLength]: VALIDATION_MESSAGES[ValidatorKey.MinLength].replace(
          /{minlength}/,
          String(PASSWORD_MIN_LENGTH),
        ),
        [ValidatorKey.Password]: VALIDATION_MESSAGES[ValidatorKey.Password],
      },
    };
  }
}
