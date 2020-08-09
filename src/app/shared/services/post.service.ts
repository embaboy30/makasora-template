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
  private basePath: string = '/posts';

  posts: AngularFireList<Post> = null; //  list of objects
  post: AngularFireObject<Post> = null; //   single object

  constructor(private db: AngularFireDatabase) { }

  getItemsList(): Observable<Article[]> {
    this.posts = this.db.list(this.basePath);
    return this.posts.snapshotChanges().pipe(map(x => {
      var data: Article[] = x.map(res => {
        return { key: res.key , value: res.payload.val()} as Article;
      });
      return data;
    }));
  }

  // getItem(key: string): AngularFireObject<Post> {
  //   const itemPath =  `${this.basePath}/${key}`;
  //   this.item = this.db.object(itemPath)
  //   return this.item
  // }
  createItem(item: Post): void  {
    this.posts.push(item);
  }
  updateItem(article: Article): void {
    this.posts.update(article.key, article.value)
      .catch(error => this.handleError(error))
  }
  deleteItem(key: string): void {
      this.posts.remove(key)
        .catch(error => this.handleError(error))
  }

  handleError(error) {
    console.log(error);
  }
}
