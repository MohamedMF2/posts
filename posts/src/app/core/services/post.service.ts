import { Injectable } from '@angular/core';
import { from, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/posts/post.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  private baseUrl = 'http://localhost:8000/api/posts';
  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(this.baseUrl)
      .pipe(
        map((data) => {
          return data.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    // console.log(' service addPost');

    const post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string }>(this.baseUrl, post)
      .subscribe((responseData) => {
        // console.log(responseData.message);
        this.posts.push(post);

        this.postsUpdated.next([...this.posts]);
      });
  }
  deletePost(id: string) {
    // console.log('delete', id);
    this.http.delete(this.baseUrl + '/' + id).subscribe(() => {
      // console.log('deleted!');
      this.posts = this.posts.filter((post) => post.id !== id);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
