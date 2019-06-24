import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { TasksReducer } from './tasks.reducer';
import { SettingsReducer } from './settings.reducer';
export interface State {

}

export const reducers: ActionReducerMap<State> = {
  tasks: TasksReducer,
  settings: SettingsReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
