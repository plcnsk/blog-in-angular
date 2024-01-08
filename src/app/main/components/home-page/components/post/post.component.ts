import { Component, Input } from '@angular/core';
import { Post } from '../../../../../admin/components/create-page/interfaces/create-page.interface';

@Component({
  selector: 'app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss'],
})
export class PostComponent {
  @Input() post!: Post;
}
