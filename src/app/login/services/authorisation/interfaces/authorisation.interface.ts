export type AuthErrorKey =
  | 'INVALID_EMAIL'
  | 'INVALID_PASSWORD'
  | 'INVALID_LOGIN_CREDENTIALS';

export type AuthErrorMessage = Record<AuthErrorKey, string>;
