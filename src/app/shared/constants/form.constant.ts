import { ValidatorKey } from '../enums/validators.enum';

export const VALIDATION_MESSAGES = {
  [ValidatorKey.Required]: 'This field is required',
  [ValidatorKey.Email]: 'Incorrect email',
  [ValidatorKey.MinLength]: 'This field should be more then {minlength} symbols',
  [ValidatorKey.Password]:
    'Password should contains uppercase, lowercase letters, numbers and special symbols',
};
