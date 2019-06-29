import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../../components/tasks/models/task.model';
import { TasksActionsUnion, TasksActionTypes } from '../actions/tasks.actions';

export interface StateTasks extends EntityState<Task> {
  // additional entities state properties
  selectedTaskId: string | number | null;
  loading?: boolean;
  error?: null;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: StateTasks = adapter.getInitialState({
  // additional entity state properties
  selectedTaskId: null,
  ids: [],
  entities: null
});

export function TasksReducer(state = initialState, action: TasksActionsUnion): StateTasks {
  switch (action.type) {

    case TasksActionTypes.GetTasks:
    case TasksActionTypes.AddTask:
    case TasksActionTypes.UpdateTask:
    case TasksActionTypes.UpdateStatusTask:
      return {
        ...state,
        loading: true
      };

    case TasksActionTypes.GetTask:
      return { ...state, selectedTaskId: action.payload };

    case TasksActionTypes.LoadTasks:
      return adapter.addAll(action.payload, state);

    case TasksActionTypes.LoadTask:
      return adapter.upsertOne(action.payload, state);

    default:
      return state;
  }
}

export const getSelectedTaskId = (state: StateTasks) => state.selectedTaskId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of Task ids
export const selectTaskIds = selectIds;

// select the dictionary of Task entities
export const selectTaskEntities = selectEntities;

// select the array of Tasks
export const selectAllTasks = selectAll;

// select the total Task count
export const selectTaskTotal = selectTotal;

