import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../../shared/services/posts.service';
import { Post } from '../create-page/interfaces/create-page.interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: 'dashboard-page.component.html',
  styleUrls: ['dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  posts: Post[] = [];
  search = '';

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getAllPosts$().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(idToRemove: string) {
    this.postsService.removePost$(idToRemove).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== idToRemove);
    });
  }
}
