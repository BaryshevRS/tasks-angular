export interface IStatus {
  name: string
  order: number;
}

export interface IPriority {
  color: string;
  name: string;
  order: number;
}

// export class Status implements IStatus {
//   constructor(public name: string, public order: number) {
//   }
// }
//
// export class Priority implements IPriority {
//   constructor(public name: string, public order: number, public color: string) {
//   }
// }

export type Priorities = Map<string, IPriority>[];
export type Statuses = Map<string, IStatus>[];

export class Settings {
  priority: Priorities;
  statuses: Statuses;
}

export type SessionUnion = Priorities | Statuses;
