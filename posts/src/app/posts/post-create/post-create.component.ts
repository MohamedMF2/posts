import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';

 @Output() createdPost = new EventEmitter<Post>()
  onAddPost() {
    const newPost :Post= {
      title: this.enteredTitle,
      content: this.enteredContent,
    };
    this.createdPost.emit(newPost)
  }
  constructor() {}

  ngOnInit(): void {}
}
