import { Action } from '@ngrx/store';
import { Task } from '../../components/tasks/models/task.model';

export enum TasksActionTypes {
  GetTasks = '[Task] Get Tasks',
  GetTask = '[Task] Get Task',
  LoadTasks = '[Task] Load Tasks',
  LoadTask = '[Task] Load Task',
  UpdateStatusTask = '[Task] Update Status Task',
  UpdateTask = '[Task] Update Task',
  AddTask = '[Task] Add Task',
  AddTaskSuccess = '[Task] Add Task Success',
  ErrorTasks = '[Task] Error Tasks',
  FilterPriorityTasks = '[Task] Filter Priority Tasks',
  SetViewTasks = '[Task] Set View Tasks'
}

export class GetTasks implements Action {
  readonly type = TasksActionTypes.GetTasks;
}

export class AddTaskSuccess implements Action {
  readonly type = TasksActionTypes.AddTaskSuccess;
}

export class GetTask implements Action {
  readonly type = TasksActionTypes.GetTask;

  constructor(public payload: string | number) {
  }
}

export class LoadTasks implements Action {
  readonly type = TasksActionTypes.LoadTasks;
  constructor(public payload: Task[]) {
  }
}

export class LoadTask implements Action {
  readonly type = TasksActionTypes.LoadTask;
  constructor(public payload: Task) {
  }
}

export class AddTask implements Action {
  readonly type = TasksActionTypes.AddTask;
  constructor(public payload: Task) {
  }
}

export class UpdateTask implements Action {
  readonly type = TasksActionTypes.UpdateTask;

  constructor(public payload: Task) {
  }
}

export class UpdateStatusTask implements Action {
  readonly type = TasksActionTypes.UpdateStatusTask;

  constructor(public payload: Task) {
  }
}

export class ErrorTasks implements Action {
  readonly type = TasksActionTypes.ErrorTasks;
  constructor(public payload: any) {
  }
}

export class FilterPriorityTasks implements Action {
  readonly type = TasksActionTypes.FilterPriorityTasks;
  constructor(public payload: string | null) {
  }
}

export class SetViewTasks implements Action {
  readonly type = TasksActionTypes.SetViewTasks;
  constructor(public payload: boolean) {
  }
}

export type TasksActionsUnion =
  | LoadTasks
  | LoadTask
  | GetTasks
  | GetTask
  | AddTask
  | AddTaskSuccess
  | UpdateTask
  | UpdateStatusTask
  | ErrorTasks
  | FilterPriorityTasks
  | SetViewTasks;
