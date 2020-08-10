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
  user$: Observable<User>;
  constructor(
    public angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public router: Router,
  ) {
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.angularFireDatabase.object(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
    this.angularFireAuth.authState.subscribe(res =>  console.log(res) );
   }

  login() {
    const credential = this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    credential.then(res => this.updateUserData(res.user));
  }
  logout() {
    this.angularFireAuth.auth.signOut();
  }
  
  private updateUserData(user) {
    // Sets user data to firestore on login
    const itemPath =  `$user/${user.uid}`;
    const userRef: AngularFireObject<User>  = this.angularFireDatabase.object(itemPath)
    const data: User = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL
    } 

    return userRef.set(data)

  }
  
}
