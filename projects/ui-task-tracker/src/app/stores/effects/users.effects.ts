import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersActionTypes, SignOutUser, SignOutUserSuccess, LoginUser, ErrorUsers, LoginUserSuccess } from '../actions/users.actions';
import { AuthService } from '../../components/users/services/auth.service';


@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType<LoginUser>(UsersActionTypes.LoginUser),
    switchMap(({ payload }) => {

      console.log('LoginUser', payload);

      return this.authService.emailLogin(payload.email, payload.password).then(
        () => {
          console.log('loginUser$');
          return new LoginUserSuccess({email: ''});
        }).catch(error => of(new ErrorUsers()));

    })
  );

  @Effect()
  UpdateTask$ = this.actions$.pipe(
    ofType<SignOutUser>(UsersActionTypes.SignOutUser),
    switchMap(() => of(new SignOutUserSuccess()))
  );

}
