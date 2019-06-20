import { Action } from '@ngrx/store';
import { Task } from '../../components/tasks/models/task.model';

export enum TasksActionTypes {
  GetTasks = '[Task] Get Tasks',
  LoadTasks = '[Task] Load Tasks',
  GetTask = '[Task] Get Task',
  AddTask = '[Task] Add Task',
  AddTaskSuccess = '[Task] Add Task Success',
  UpdateTask = '[Task] Update Task',
  UpdateTaskSuccess = '[Task] Add Task Success',
  ErrorTasks = '[Task] Error Tasks',
}

export class GetTasks implements Action {
  readonly type = TasksActionTypes.GetTasks;
}

export class LoadTasks implements Action {
  readonly type = TasksActionTypes.LoadTasks;

  constructor(public payload: Task[]) {
  }
}

export class GetTask implements Action {
  readonly type = TasksActionTypes.GetTask;

  constructor(public payload: string) {
  }
}

export class AddTask implements Action {
  readonly type = TasksActionTypes.AddTask;
}

export class UpdateTask implements Action {
  readonly type = TasksActionTypes.UpdateTask;
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
}

export type TasksActionsUnion =
  | LoadTasks
  | GetTasks
  | GetTask
  | AddTask
  | UpdateTaskSuccess
  | AddTaskSuccess
  | UpdateTask
  | ErrorTasks;
