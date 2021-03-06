import { AuthService } from './../../shared/services/auth.service';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { Article } from './../../shared/models/post';
import { PostFormDialogComponent } from './../../shared/dialogs/post-form-dialog/post-form-dialog.component';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  uploadPercent;
  downloadURL;
  constructor(
    private dialogService: NbDialogService,
    private postService: PostService,
    private router: Router,
    private storage: AngularFireStorage,
    private datePipe: DatePipe,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getArticles();
    console.log(this.postService.canRead());
    console.log(this.postService.canEdit());
    console.log(this.postService.canDelete());
  }
  getArticles(){
    this.postService.getArticleList().subscribe(res => {
      this.articles = res ? res : [];
    });
  }
  openDialog(article: Article = null) {
    this.postService.selectedArticle = article;
    const dialogRef = this.dialogService.open(PostFormDialogComponent).onClose.subscribe(async res => {
      if (res) {
        if (!article) {
          const imageUrl = await this.uploadImage(res.file, 'images/' + this.datePipe.transform(new Date(), 'MMddyyyyHHmm'));
          const data: Post = {
            title: res.title,
            body: res.body,
            timeStamp: new Date().toString(),
            active: true,
            image: imageUrl,
            author: this.authService.currentUser.displayName,
          };
          this.postService.createArticle(data);
          this.getArticles();
        }else {
          let imageUrl;
          if (res.file) {
            imageUrl = await this.uploadImage(res.file, 'images/' + this.datePipe.transform(new Date(), 'MMddyyyyHHmm'));
          }
          article.value.body = res.body;
          article.value.title = res.title;
          article.value.author = this.authService.currentUser.displayName;
          article.value.image = res.file ? imageUrl : article.value.image;
          this.postService.updateArticle(article);
        }
      }
      this.postService.selectedArticle = null;
    });
  }

  uploadImage(file, filePath): Promise<string>{
    return new Promise(resolve => {
      const task = this.storage.upload(filePath, file);
      const ref = this.storage.ref(filePath);

      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL()
          this.downloadURL.subscribe(url => (resolve(url)));
        })
      )
      .subscribe();
    });
  }
  view(val) {
    this.router.navigate(['/blog/article/' + val.key]);
  }
  onDelete(article: Article = null) {
    const dialogRef = this.dialogService.open(ConfirmDialogComponent).onClose.subscribe(res => {
      if (res) {
        this.postService.deleteArticle(article.key);
        this.getArticles();
      }
    });
  }
}
