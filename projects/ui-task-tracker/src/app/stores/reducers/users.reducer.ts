import { Action } from '@ngrx/store';
import { UsersActionsUnion, UsersActionTypes } from '../actions/users.actions';
import { IUser } from '../../components/users/models/users.model';
import { StateTasks } from './tasks.reducer';
import { State } from './index';


export interface StateUsers {
  profile: IUser;
}

export const initialState: StateUsers = {
  profile: null
};

export function UsersReducer(state = initialState, action: UsersActionsUnion): StateUsers {
  switch (action.type) {

    case UsersActionTypes.SignOutUserSuccess:
      return { ...state, profile: null};

    case UsersActionTypes.ErrorUsers:
      return { ...state};

    case UsersActionTypes.LoginUserCheck:
    case UsersActionTypes.LoginUserSuccess:
      return { ...state, profile: action.payload};

    default:
      return state;
  }
}
