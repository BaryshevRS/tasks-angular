import { Action } from '@ngrx/store';
import { Task } from '../../components/tasks/models/task.model';

export enum TasksActionTypes {
  GetTasks = '[Task] Get Tasks',
  GetTask = '[Task] Get Task',
  LoadTasks = '[Task] Load Tasks',
  LoadTask = '[Task] Load Task',
  UpdateStatusTask = '[Task] Update Status Task',
  AddTask = '[Task] Add Task',
  AddTaskSuccess = '[Task] Add Task Success',
  UpdateTask = '[Task] Update Task',
  UpdateTaskSuccess = '[Task] Add Task Success',
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

export class AddTaskSuccess implements Action {
  readonly type = TasksActionTypes.AddTaskSuccess;

  constructor(public payload: Task) {
  }
}

export class UpdateTaskSuccess implements Action {
  readonly type = TasksActionTypes.UpdateTaskSuccess;

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
  | UpdateTaskSuccess
  | AddTaskSuccess
  | UpdateTask
  | UpdateStatusTask
  | ErrorTasks;
