import { Action } from '@ngrx/store';

export enum InitsActionTypes {
  LoadInits = '[Init] Load Inits',
  ErrorMessage = '[Init] Error Message',
}

export class LoadInits implements Action {
  readonly type = InitsActionTypes.LoadInits;
}

export class ErrorMessage implements Action {
  readonly type = InitsActionTypes.ErrorMessage;
}

export type InitsActionsUnion =
  | LoadInits
  | ErrorMessage;
