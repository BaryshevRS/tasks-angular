import { Action } from '@ngrx/store';
import { IUser } from '../../components/users/models/users.model';

export enum UsersActionTypes {
  LoginUser = '[User] Login User',
  LoginUserSuccess = '[User] Login User Success',
  SignOutUser = '[User] Sign Out User',
  SignOutUserSuccess = '[User] Sign Out User Success',
  ErrorUsers = '[User] Error Users'
}

export class LoginUser implements Action {
  readonly type = UsersActionTypes.LoginUser;
  constructor(public payload: IUser) {
  }
}

export class LoginUserSuccess implements Action {
  readonly type = UsersActionTypes.LoginUserSuccess;
  constructor(public payload: IUser) {
  }
}

export class SignOutUser implements Action {
  readonly type = UsersActionTypes.SignOutUser;
}

export class SignOutUserSuccess implements Action {
  readonly type = UsersActionTypes.SignOutUserSuccess;
}

export class ErrorUsers implements Action {
  readonly type = UsersActionTypes.ErrorUsers;
}

export type UsersActionsUnion =
  | LoginUser
  | LoginUserSuccess
  | SignOutUser
  | SignOutUserSuccess
  | ErrorUsers;
