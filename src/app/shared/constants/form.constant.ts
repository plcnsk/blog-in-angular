import {ValidatorKey} from "../enums/validators.enum";

export const VALIDATION_MESSAGES = {
  [ValidatorKey.Required]: 'This field is required',
  [ValidatorKey.Email]: 'Incorrect email',
  [ValidatorKey.MinLength]: 'Password should be more then {minlength} symbols',
}
