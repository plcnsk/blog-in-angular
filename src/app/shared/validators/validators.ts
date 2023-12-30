import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidatorKey } from '../enums/validators.enum';

export abstract class CustomValidators {
  static email(): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      if (value === null) {
        value = '';
      }

      if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
        return null;
      }

      return { [ValidatorKey.Email]: true };
    };
  }

  static password(): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      const error = {
        [ValidatorKey.Password]: true,
      };

      if (value === null) {
        return null;
      }

      if (!value.match(/[0-9]/)) {
        return error;
      } else if (!value.match(/[A-Z]/)) {
        return error;
      } else if (!value.match(/[a-z]/)) {
        return error;
      } else if (
        !value.match(/[~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\|\;\:\"\<\>\,\.\?\/\\]/)
      ) {
        return error;
      }

      return null;
    };
  }
}
