import { environment } from '../../../../../environments/environment';
import { AuthErrorMessage } from '../interfaces/authorisation.interface';

export const AUTH_ROUTE = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;
export const EXPIRES_TOKEN_KEY = 'fb-token-expires';
export const TOKEN_KEY = 'fb-token';

export const AUTH_ERROR_MESSAGES: AuthErrorMessage = {
  INVALID_EMAIL: 'Invalid email!',
  INVALID_PASSWORD: 'Invalid password!',
  INVALID_LOGIN_CREDENTIALS: 'Invalid email or password!',
};
