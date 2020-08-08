import { PostService } from './../../shared/services/post.service';
import { Post } from './../../shared/models/post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  create() {
    const data: Post = {
      id: '1',
      title: 'asd',
      body: 'asdasd',
      timeStamp: new Date().toString(),
      active: true,
    }
    this.postService.createItem(data);
  }
}
