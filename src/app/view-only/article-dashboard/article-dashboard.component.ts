import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import { Article } from 'src/app/shared/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-dashboard',
  templateUrl: './article-dashboard.component.html',
  styleUrls: ['./article-dashboard.component.scss']
})
export class ArticleDashboardComponent implements OnInit {
  articles: Article[] =[];
  defaultImage = '../../../assets/images/defaultImage.svg';
  constructor(
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.postService.getArticleList().subscribe(res => {
      this.articles = res ? res : [];
    });
  }
  view(val) {
    this.router.navigate(['/blog/article/' + val.key]);
  }
}
