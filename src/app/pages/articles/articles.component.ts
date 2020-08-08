import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { Article } from './../../shared/models/post';
import { PostFormDialogComponent } from './../../shared/dialogs/post-form-dialog/post-form-dialog.component';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  constructor(
    private dialogService: NbDialogService,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }
  getArticles(){
    this.postService.getItemsList().subscribe(res => {
      this.articles = res ? res : [];
    });
  }
  openDialog(article: Article = null) {
    this.postService.selectedArticle = article;
    const dialogRef = this.dialogService.open(PostFormDialogComponent).onClose.subscribe(res => {
      if (res) {
        if (!article) {
          const data: Post = {
            title: res.title,
            body: res.body,
            timeStamp: new Date().toString(),
            active: true,
          }
          this.postService.createItem(data);
          this.getArticles();
        }else {
          article.value.body = res.body;
          article.value.title = res.title;
          this.postService.updateItem(article);
        }
      }
      this.postService.selectedArticle = null;
    });
  }

  onDelete(article: Article = null) {
    const dialogRef = this.dialogService.open(ConfirmDialogComponent).onClose.subscribe(res => {
      if (res) {
        this.postService.deleteItem(article.key);
        this.getArticles();
      }
    });
  }
}
