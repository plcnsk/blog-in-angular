import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Post,
  PostPayLoad,
} from '../../admin/components/create-page/interfaces/create-page.interface';
import { environment } from '../../../environments/environment';
import { FbCreateResponse } from '../interfaces/interface';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  create$(payload: PostPayLoad): Observable<Post> {
    return this.http
      .post<FbCreateResponse>(`${environment.fbDbUrl}/posts.json`, payload)
      .pipe(
        map(({ name: id }: FbCreateResponse) => {
          return {
            ...payload,
            id,
          };
        }),
      );
  }

  getAllPosts$(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map(id => ({
          ...response[id],
          id,
        }));
      }),
    );
  }

  getById$(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`).pipe(
      map((post: Post) => {
        return {
          ...post,
          id,
        };
      }),
    );
  }

  removePost$(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }

  updatePost$(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
  }
}
