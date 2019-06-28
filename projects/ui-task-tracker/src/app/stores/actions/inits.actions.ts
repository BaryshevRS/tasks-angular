import { Action } from '@ngrx/store';

export enum InitsActionTypes {
  LoadInits = '[Init] Load Inits',
}

export class LoadInits implements Action {
  readonly type = InitsActionTypes.LoadInits;
}

export type InitsActionsUnion = LoadInits;
