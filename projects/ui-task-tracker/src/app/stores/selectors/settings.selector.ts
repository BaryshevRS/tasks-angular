import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { StateSettings } from '../reducers/settings.reducer';
import { selectAllTasks } from './tasks.selector';

export const selectSettingsState = createFeatureSelector<StateSettings>('settings');

export const selectTaskWithSettings = createSelector(
  selectAllTasks,
  selectSettingsState,
  (task, setting) => [task, setting]
);
