import { Post, Article } from './../models/post';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  selectedArticle: Article;
  private postBasePath: string = '/posts';

  posts: AngularFireList<Post> = null; //  list of objects
  post: AngularFireObject<Post> = null; //   single object

  constructor(private db: AngularFireDatabase) { }

  getArticleList(): Observable<Article[]> {
    this.posts = this.db.list(this.postBasePath);
    return this.posts.snapshotChanges().pipe(map(x => {
      var data: Article[] = x.map(res => {
        return { key: res.key , value: res.payload.val()} as Article;
      });
      return data;
    }));
  }

  getArticle(key: string): Observable<Article>{
    const itemPath =  `${this.postBasePath}/${key}`;
    this.post = this.db.object(itemPath)
    return this.post.snapshotChanges().pipe(map(x => {
      return { key: x.key , value: x.payload.val()} as Article;;
    }));
  }
  createArticle(item: Post): void  {
    this.posts.push(item);
  }
  updateArticle(article: Article): void {
    this.posts.update(article.key, article.value)
      .catch(error => this.handleError(error))
  }
  deleteArticle(key: string): void {
      this.posts.remove(key)
        .catch(error => this.handleError(error))
  }

  handleError(error) {
    console.log(error);
  }
}
