import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from '../../admin/components/create-page/interfaces/create-page.interface';
import { environment } from '../../../environments/environment';
import { FbCreateResponse } from '../interfaces/interface';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http
      .post<FbCreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map(({ name: id }: FbCreateResponse) => {
          return {
            ...post,
            id,
          };
        }),
      );
  }
}
