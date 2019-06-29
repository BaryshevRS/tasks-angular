import { Action } from '@ngrx/store';
import { Task } from '../../components/tasks/models/task.model';

export enum TasksActionTypes {
  GetTasks = '[Task] Get Tasks',
  GetTask = '[Task] Get Task',
  LoadTasks = '[Task] Load Tasks',
  LoadTask = '[Task] Load Task',
  UpdateStatusTask = '[Task] Update Status Task',
  AddTask = '[Task] Add Task',
  UpdateTask = '[Task] Update Task',
  ErrorTasks = '[Task] Error Tasks',
}

export class GetTasks implements Action {
  readonly type = TasksActionTypes.GetTasks;
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

export type TasksActionsUnion =
  | LoadTasks
  | LoadTask
  | GetTasks
  | GetTask
  | AddTask
  | UpdateTask
  | UpdateStatusTask
  | ErrorTasks;
