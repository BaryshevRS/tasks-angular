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

import { Action } from '@ngrx/store';
import { NoteMessageService } from '../../share/services/note-message.service';
import { NoteMessage } from "../../share/classes/note-message.class";
import { Router } from "@angular/router";


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
          this.noteMessageService.handleError(new NoteMessage('Ошибка авторизации', 'Закрыть'));
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
          this.noteMessageService.handleError(new NoteMessage('Ошибка выхода', 'Закрыть'));
          return new ErrorUsers();
        });
    })
  );

}
