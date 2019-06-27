import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { StateTasks, TasksReducer } from './tasks.reducer';
import { SettingsReducer, StateSettings } from './settings.reducer';
import { StateUsers, UsersReducer } from './users.reducer';

export interface State {
  tasks: StateTasks;
  settings: StateSettings;
  users: StateUsers;
}

export const reducers: ActionReducerMap<State> = {
  tasks: TasksReducer,
  settings: SettingsReducer,
  users: UsersReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
