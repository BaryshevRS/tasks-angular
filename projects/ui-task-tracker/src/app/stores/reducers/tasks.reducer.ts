import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../../components/tasks/models/task.model';
import { TasksActionsUnion, TasksActionTypes } from '../actions/tasks.actions';
import { LoadInits } from '../actions/inits.actions';

export interface StateTasks extends EntityState<Task> {
  // additional entities state properties
  selectId: string | number | null;
  loading?: boolean;
  error?: null;
  filters: {
    priority: string | null
  };
  viewScrum: boolean;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: StateTasks = adapter.getInitialState({
  // additional entity state properties
  selectId: null,
  ids: [],
  entities: null,
  filters: {
    priority: null
  },
  viewScrum: false
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

    case TasksActionTypes.AddTaskSuccess:
      return {
        ...state,
        loading: false
      };

    case TasksActionTypes.GetTask:
      return { ...state, selectId: action.payload };

    case TasksActionTypes.LoadTasks:
      return adapter.addAll(action.payload, state);

    case TasksActionTypes.LoadTask:
      return adapter.upsertOne(action.payload, state);

    case TasksActionTypes.FilterPriorityTasks:
      return {...state, filters: {priority: action.payload}};

    case TasksActionTypes.SetViewTasks:
      return {...state, viewScrum: action.payload};

    default:
      return state;
  }
}

export const getSelectedTaskId = (state: StateTasks) => state.selectId;

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

