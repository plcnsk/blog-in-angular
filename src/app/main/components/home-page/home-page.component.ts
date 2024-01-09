import { Component, OnInit } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { Post } from '../../../admin/components/create-page/interfaces/create-page.interface';
import { PostsService } from '../../../shared/services/posts.service';
import { DataState } from '../../../shared/enums/data-state.enum';

@Component({
  selector: 'app-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss'],
})
export class HomePageComponent {
  readonly dataState = DataState;
  state: DataState = DataState.Loading;

  constructor(private postsService: PostsService) {}

  posts$ = this.postsService.getAllPosts$().pipe(
    tap(posts => {
      if (!posts || !posts.length) {
        this.state = DataState.Empty;
      } else {
        this.state = DataState.Exist;
      }
    }),
  );
}
