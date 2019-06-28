import { createFeatureSelector } from '@ngrx/store';
import { StateUsers } from '../reducers/users.reducer';

export const selectUserState = createFeatureSelector<StateUsers>('users');
