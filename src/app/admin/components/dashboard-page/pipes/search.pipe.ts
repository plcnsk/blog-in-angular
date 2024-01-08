import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../create-page/interfaces/create-page.interface';

@Pipe({
  name: 'searchPosts',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim()) {
      return posts;
    }

    return posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
  }
}
