import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../../shared/services/posts.service';
import { delay, Observable, switchMap } from 'rxjs';
import { Post } from '../../../admin/components/create-page/interfaces/create-page.interface';

@Component({
  selector: 'app-posts-page',
  templateUrl: 'post-page.component.html',
  styleUrls: ['post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  post$!: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) {}

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById$(params['id']);
      }),
    );
  }
}
