import { Action } from '@ngrx/store';
import { UsersActionTypes } from '../actions/users.actions';
import { IUser } from '../../components/users/models/users.model';


export interface StateUsers {
  profile: IUser;
}

export const initialState: StateUsers = {
  profile: null
};

export function UsersReducer(state = initialState, action: Action): StateUsers {
  switch (action.type) {

    case UsersActionTypes.SignOutUserSuccess:
      return { ...state, profile: null};

    case UsersActionTypes.ErrorUsers:
      return { ...state};

    default:
      return state;
  }
}
