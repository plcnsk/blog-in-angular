import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidatorKey } from '../enums/validators.enum';

type ErrorState<Key extends string> = Record<Key, ControlErrors>;
type ControlErrors = Partial<Record<ValidatorKey, string>>;

export abstract class FormExtension<Key extends string> {
  protected form: FormGroup | undefined;
  protected errorState: ErrorState<Key> | undefined;

  protected control(key: Key): AbstractControl {
    if (!this.form) {
      throw new Error(
        "Please, provide 'form' property in order to user 'control' method!",
      );
    }

    return this.form.controls[key];
  }

  protected get isSubmittable(): boolean {
    if (!this.form) {
      throw new Error(
        "Please, provide 'form' property in order to user 'control' method!",
      );
    }

    return this.form.valid && this.form.enabled;
  }

  protected isInValid(key: Key): boolean {
    const control = this.control(key);
    return control.touched && control.invalid;
  }

  protected errorMessage(key: Key): string | undefined {
    const errors = this.control(key).errors;

    if (!this.errorState) {
      throw new Error(
        "Please, provide 'errorState' property in order to user 'errorMessage' method!",
      );
    }

    if (!errors) {
      throw new Error('There is no errors on ' + key + ' control!');
    }

    const errorKey = Object.keys(errors)[0] as ValidatorKey;
    return this.errorState[key][errorKey];
  }
}
