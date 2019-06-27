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
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ErrorMessage } from '../../../share/classes/errors.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<IUser | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
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

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.router.navigate(['/tasks']);
        return user as IUser;
      });
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        return this.updateUserData(credential.user);
      });
      // .catch(error => this.handleError(error));
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: IUser = {
      uid: user.uid,
      email: user.email || null
    };
    return userRef.set(data);
  }
}
