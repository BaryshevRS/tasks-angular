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

export type Priorities = Map<string, IPriority>[];
export type Statuses = Map<string, IStatus>[];

export class Settings {
  priority: Priorities;
  statuses: Statuses;
}

export type SessionUnion = Priorities | Statuses;

export interface IPriorityRow extends IPriority {
  id: boolean;
  key: string;
}

export class PriorityRow implements IPriorityRow {

  public key = '';
  public color = '';
  public name = '';
  public order = 0;
  public id = true;

  constructor(key?, color?, name?, order?, id?) {
  }

  formModel(data?) {

    const { key = null, color = null, name = null, order = null, id  = null} = data || {};

    return {
      key: [key || this.key, [Validators.required]],
      color: [color || this.color, [Validators.required]],
      name: [name || this.name, [Validators.required]],
      order: [order || this.order, [Validators.required]],
      id: [id || this.id, [Validators.required]]
    }
  }
}
