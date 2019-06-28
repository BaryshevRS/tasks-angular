import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromTask from '../reducers/tasks.reducer';
import { StateTasks } from '../reducers/tasks.reducer';
import { StateSettings } from '../reducers/settings.reducer';
import { StateUsers } from '../reducers/users.reducer';
import { selectSettingsState } from './settings.selector';
import { selectUserState } from './users.selector';
import { IUser } from '../../components/users/models/users.model';
import { Settings } from '../../components/settings/models/settings.model';

export const selectTaskState = createFeatureSelector<StateTasks>('tasks');

export const selectTaskIds = createSelector(
  selectTaskState,
  fromTask.selectTaskIds
);
export const selectTaskEntities = createSelector(
  selectTaskState,
  fromTask.selectTaskEntities
);
export const selectAllTasks = createSelector(
  selectTaskState,
  fromTask.selectAllTasks
);
export const selectTaskTotal = createSelector(
  selectTaskState,
  fromTask.selectTaskTotal
);
export const selectCurrentTaskId = createSelector(
  selectTaskState,
  fromTask.getSelectedTaskId
);

export const selectCurrentTask = createSelector(
  selectTaskEntities,
  selectCurrentTaskId,
  (TaskEntities, TaskId) => {
    return TaskEntities && TaskId ? TaskEntities[TaskId] : null;
  }
);

