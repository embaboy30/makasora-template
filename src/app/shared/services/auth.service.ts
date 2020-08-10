import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  private postBasePath: string = '/users';
  Users: AngularFireList<User> = null; //  list of objects
  constructor(
    public angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public router: Router,
  ) {
    this.Users = this.angularFireDatabase.list(this.postBasePath);
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.angularFireDatabase.object(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
   }

  async login() {
    const credential = await this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.updateUserData(credential.user)
  }
  logout() {
    this.angularFireAuth.auth.signOut();
  }
  
  private updateUserData(user) {
    this.user$.subscribe(res =>  {
      if (res) {
        this.Users.update(res.key, res.payload.val())
      .catch(error => console.log(error));
      }else {
        const data: User = { 
          uid: user.uid, 
          email: user.email, 
          displayName: user.displayName, 
          photoURL: user.photoURL
        } 
        this.Users.set(user.uid, data);
      }
    });
  }
  
}
