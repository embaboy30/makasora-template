import { Post } from './../models/post';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private basePath: string = '/posts';

  items: AngularFireList<Post> = null; //  list of objects
  item: AngularFireObject<Post> = null; //   single object

  constructor(private db: AngularFireDatabase) {
    var asd = this.getItemsList();
    asd.snapshotChanges().subscribe(x => console.log(x))
   }

  getItemsList(): AngularFireList<Post> {
    this.items = this.db.list(this.basePath);
    return this.items
  }

  // Return a single observable item
  getItem(key: string): AngularFireObject<Post> {
    const itemPath =  `${this.basePath}/${key}`;
    this.item = this.db.object(itemPath)
    return this.item
  }
  createItem(item: Post): void  {
    this.items.push(item);
  }
}
