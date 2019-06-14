import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {AuthService} from "../service/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        public afAuth: AngularFireAuth
    ) {
    }

    // getCurrentUser(){
    //     return new Promise<any>((resolve, reject) => {
    //         var user = afAuth.auth().onAuthStateChanged(function(user){
    //             if (user) {
    //                 resolve(user);
    //             } else {
    //                 reject('No user logged in');
    //             }
    //         })
    //     })
    // }

    // canActivate(): Promise<boolean>{
    //     return new Promise((resolve, reject) => {
    //         this.getCurrentUser()
    //             .then(user => {
    //                 this.router.navigate(['/user']);
    //                 return resolve(false);
    //             }, err => {
    //                 return resolve(true);
    //             })
    //     })
    // }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        var user = this.authService.currentUser();



        return of(true);

        // return this.authService.isAuth().subscribe(auth => {
        //     console.log('AuthGuard', auth);
        //     if (auth) {
        //         return of(true);
        //     } else {
        //         this.router.navigate(['/login']);
        //         return EMPTY;
        //     }
        // })
    }

}
