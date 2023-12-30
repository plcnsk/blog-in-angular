import { CreatePageKey } from '../enums/create-page.enum';

export interface Post {
  [CreatePageKey.Title]: string;
  [CreatePageKey.Text]: string;
  [CreatePageKey.Author]: string;
  date: Date;
  id?: string;
}
