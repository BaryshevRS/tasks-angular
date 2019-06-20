import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { tasksReducer } from "./tasks.reducer";
export interface State {

}

export const reducers: ActionReducerMap<State> = {
  tasks: tasksReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
