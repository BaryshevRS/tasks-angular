import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { StateTasks, TasksReducer } from './tasks.reducer';
import { SettingsReducer, StateSettings } from './settings.reducer';

export interface State {
  tasks: StateTasks,
  settings: StateSettings;
}

export const reducers: ActionReducerMap<State> = {
  tasks: TasksReducer,
  settings: SettingsReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
