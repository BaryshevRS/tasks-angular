import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../models/users.model';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<IUser | null>;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router,
      private _snackBar: MatSnackBar
  ) {

    this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
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
          return this.updateUserData(credential.user);
        })
        .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(credential => {

          console.log('credential', credential);

          this.router.navigate(['/tasks']);
          return true;
        })
        .catch(error => this.handleError(error));
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.log(error);

    this._snackBar.open('Ошибка авторизации', 'Закрыть', {
      duration: 2000,
      verticalPosition: 'top'
    });

  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(
        `users/${user.uid}`
    );

    const data: IUser = {
      uid: user.uid,
      email: user.email || null,
      // displayName: user.displayName || '',
      // photoURL: user.photoURL || ''
      // photoURL: user.photoURL || ''
    };
    return userRef.set(data);
  }
}
