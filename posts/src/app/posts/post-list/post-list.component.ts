import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  // posts=[{
  //   title:'post 1',
  //   content:'this is post one contetnt '
  // },{
  //   title:'post 2',
  //   content:'this is post two contetnt '
  // },{
  //   title:'post 3',
  //   content:'this is post three contetnt '
  // },{
  //   title:'post 4',
  //   content:'this is post four contetnt '
  // },{
  //   title:'post 5',
  //   content:'this is post five contetnt '
  // },{
  //   title:'post 6',
  //   content:'this is post six contetnt '
  // },]

  //***** */
  @Input() posts: Post[] = [];
  constructor() {}

  ngOnInit(): void {}
}
