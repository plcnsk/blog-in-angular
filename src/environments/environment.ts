import { Environment } from './interface';
import { firebaseConfig } from './firebase.config';

export const environment: Environment = {
  production: false,
  apiKey: firebaseConfig.apiKey,
  fbDbUrl: firebaseConfig.apiUrl,
};
