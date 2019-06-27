import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom, exhaustMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import {
  UsersActionTypes,
  SignOutUser,
  SignOutUserSuccess,
  LoginUser,
  ErrorUsers,
  LoginUserSuccess, UsersActionsUnion
} from '../actions/users.actions';
import { AuthService } from '../../components/users/services/auth.service';
import { IUser, User } from '../../components/users/models/users.model';
import { ErrorMessage } from '../../share/classes/errors.class';
import { ErrorsService } from '../../share/services/errors.service';
import { Action } from '@ngrx/store';


@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private errorsService: ErrorsService
  ) {
  }

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType<any>(UsersActionTypes.LoginUser),
    exhaustMap(({ payload }) => {
      return this.authService.emailLogin(payload.email, payload.password).then(
        (user: IUser) => {
          return new LoginUserSuccess(new User(user.uid, user.email));
        })
        .catch(error => {
          this.errorsService.handleError(new ErrorMessage('Ошибка авторизации', 'Закрыть'));
          return new ErrorUsers();
        });
    })
  );

  @Effect()
  UpdateTask$ = this.actions$.pipe(
    ofType<SignOutUser>(UsersActionTypes.SignOutUser),
    switchMap(() => of(new SignOutUserSuccess()))
  );

}
