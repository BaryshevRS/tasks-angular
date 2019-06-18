import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {User} from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User | null>;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router
  ) {

    this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
    );
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(credential => {

          return this.updateUserData(credential.user); // if using firestore
        })
        .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(credential => {

          this.router.navigate(['/tasks']);
          return true;
          // return this.updateUserData(credential.user);
        })
        .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    alert('Ошибка авторизации');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      // displayName: user.displayName || '',
      // photoURL: user.photoURL || ''
      // photoURL: user.photoURL || ''
    };
    return userRef.set(data);
  }
}
