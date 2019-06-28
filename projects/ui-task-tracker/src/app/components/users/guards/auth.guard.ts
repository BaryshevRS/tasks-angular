import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.authService.user.pipe(
            take(1),
            map(user => !!user),
            tap(loggedIn => {
                if (!loggedIn) {
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}
