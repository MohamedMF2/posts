import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSub: Subscription;
  constructor(public postService: PostService) {}
  onDelete(id: string) {
    console.log(id);
    this.postService.deletePost(id)
  }
  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
