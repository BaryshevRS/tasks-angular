import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user;

  constructor(
      public  afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      public  router: Router
  ) {
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.user = user;
    //     localStorage.setItem('user', JSON.stringify(this.user));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    // })

    // this.user = this.afAuth.authState.pipe(
    //     switchMap(user => {
    //       console.log('user1', user);
    //       if (user) {
    //         const x = this.afs.doc<any>(`users/${user.uid}`).valueChanges();
    //         console.log('x', x);
    //         return x;
    //       } else {
    //         return of(null);
    //       }
    //     })
    //     // tap(user => localStorage.setItem('user', JSON.stringify(user))),
    //     // startWith(JSON.parse(localStorage.getItem('user')))
    // ).subscribe()

  }

  isAuth() {
    return this.afAuth.authState;
  }

  currentUser() {
    console.log('user7', this.afAuth.auth.currentUser);

    this.afAuth.authState.subscribe(st => console.log('st', st));

    return this.afAuth.auth.currentUser;
  }


  async login(email: string, password: string) {

    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['tasks']);
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['task/login']);
  }

}
