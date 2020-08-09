import { Article } from './../../shared/models/post';
import { PostService } from 'src/app/shared/services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {
  key;
  article: Article;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {
    this.key = this.route.snapshot.paramMap.get('key');
   }

  ngOnInit(): void {
    this.postService.getArticle(this.key).subscribe(res => {
      this.article = res;
    });
  }

}
