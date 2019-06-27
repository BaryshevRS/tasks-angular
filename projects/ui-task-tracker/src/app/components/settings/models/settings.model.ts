import { Validators } from "@angular/forms";

export interface IStatus {
  name: string;
  order: number;
}

export interface IPriority {
  color: string;
  name: string;
  order: number;
}

export class Status implements IStatus {
  name: string;
  order: number;

  constructor() {
    return { order: 0, name: '-' }
  }
}

export class Priority implements IPriority {
  color: string;
  name: string;
  order: number;

  constructor() {
    return { color: '#666666', order: 0, name: '-' }
  }
}

export type Priorities = Map<string, IPriority>[];
export type Statuses = Map<string, IStatus>[];

export class Settings {
  priorities: Priorities;
  statuses: Statuses;
}

export type SessionUnion = Priorities | Statuses;
export type ISessionUnion = IStatus | IPriority;


export interface IPriorityRow extends IPriority {
  checked: boolean;
  key: string;
}

export class PriorityRow implements IPriorityRow {

  public key = '';
  public color = '';
  public name = '';
  public order = 0;
  public checked = false;

  constructor() {
  }

  formModel(data?) {

    const { key = null, color = null, name = null, order = null, checked  = null} = data;

    return {
      key: [key || this.key, [Validators.required]],
      color: [color || this.color, [Validators.required]],
      name: [name || this.name, [Validators.required]],
      order: [order || this.order, [Validators.required]],
      checked: [checked || this.checked, [Validators.required]]
    }
  }
}

export interface IStatusRow extends IStatus {
  checked: boolean;
  key: string;
}

export class StatusRow implements IStatusRow {

  public key = '';
  public name = '';
  public order = 0;
  public checked = false;

  constructor() {
  }

  formModel(data?) {
    const { key = null, name = null, order = null, checked = null } = data || {};

    return {
      key: [key || this.key, [Validators.required]],
      name: [name || this.name, [Validators.required]],
      order: [order || this.order, [Validators.required]],
      checked: [checked || this.checked, [Validators.required]]
    }
  }
}
