import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  title = new FormControl('');
  content = new FormControl('');

  constructor(public postService: PostService) {}

  onAddPost() {
    console.log(' create comp => onAddPost')
    this.postService.addPost(this.title.value,this.content.value);
    this.title.setValue('')
    this.content.setValue('')
  }

  ngOnInit(): void {}
}
