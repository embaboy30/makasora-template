import { Post, Article } from './../models/post';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  selectedArticle: Article;
  private postBasePath: string = '/posts';
  userRole: Array<string>;
  posts: AngularFireList<Post> = null; //  list of objects
  post: AngularFireObject<Post> = null; //   single object

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService,
  ) {
    this.posts = this.angularFireDatabase.list(this.postBasePath);
   }

  getArticleList(): Observable<Article[]> {
    this.posts = this.angularFireDatabase.list(this.postBasePath);
    return this.posts.snapshotChanges().pipe(map(x => {
      var data: Article[] = x.map(res => {
        return { key: res.key , value: res.payload.val()} as Article;
      });
      return data;
    }));
  }

  getArticle(key: string): Observable<Article>{
    const itemPath =  `${this.postBasePath}/${key}`;
    this.post = this.angularFireDatabase.object(itemPath)
    return this.post.snapshotChanges().pipe(map(x => {
      return { key: x.key , value: x.payload.val()} as Article;;
    }));
  }
  createArticle(item: Post): void  {
    this.posts.push(item);
  }
  updateArticle(article: Article): void {
    this.posts.update(article.key, article.value)
      .catch(error => this.handleError(error));
  }
  deleteArticle(key: string): void {
      this.posts.remove(key)
        .catch(error => this.handleError(error));
  }
  canRead(): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(allowed)
  }

  canEdit(): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(allowed)
  }

  canDelete(): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(allowed)
  }



  // determines if user has matching role
  private checkAuthorization(allowedRoles: string[]): boolean {
    if (!this.authService.currentUser) return false
    for (const role of allowedRoles) {
      if ( this.authService.currentUser.roles[role] ) {
        return true
      }
    }
    return false
  }
  
  handleError(error) {
    console.log(error);
  }
}
