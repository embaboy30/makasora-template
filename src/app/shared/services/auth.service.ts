import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public angularFireAuth: AngularFireAuth,
  ) { }

  login() {
    this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.angularFireAuth.signOut();
  }
}
