import { CreatePageKey } from '../enums/create-page.enum';

export interface PostPayLoad {
  [CreatePageKey.Title]: string;
  [CreatePageKey.Text]: string;
  [CreatePageKey.Author]: string;
  date: Date;
}

export interface Post extends PostPayLoad {
  id: string;
}
