import { Environment } from './interface';
import { firebaseConfig } from './firebase.config';

export const environment: Environment = {
  production: true,
  apiKey: firebaseConfig.apiKey,
  fbDbUrl: firebaseConfig.apiUrl,
};
