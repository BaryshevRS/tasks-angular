import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, exhaustMap } from 'rxjs/operators';

import {
  UsersActionTypes,
  SignOutUser,
  SignOutUserSuccess,
  ErrorUsers,
  LoginUserSuccess
} from '../actions/users.actions';
import { AuthService } from '../../components/users/services/auth.service';
import { IUser, User } from '../../components/users/models/users.model';

import { NoteMessageService } from '../../share/services/note-message.service';
import { NoteMessage } from '../../share/classes/note-message.class';


@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private noteMessageService: NoteMessageService
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
          this.noteMessageService.handleError(new NoteMessage('Ошибка авторизации.'));
          return new ErrorUsers();
        });
    })
  );

  @Effect()
  signOutUser$ = this.actions$.pipe(
    ofType<SignOutUser>(UsersActionTypes.SignOutUser),
    switchMap(() => {
      return this.authService.signOut().then(
        () => {
          return new SignOutUserSuccess();
        })
        .catch(error => {
          this.noteMessageService.handleError(new NoteMessage('Ошибка выхода.'));
          return new ErrorUsers();
        });
    })
  );

}
