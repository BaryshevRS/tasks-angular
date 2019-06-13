import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {AuthService} from "../service/auth.service";

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
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        return this.authService.isAuth().subscribe(auth => {
            console.log('AuthGuard', auth);
            if (auth) {
                return of(true);
            } else {
                this.router.navigate(['/login']);
                return EMPTY;
            }
        })
    }

}
