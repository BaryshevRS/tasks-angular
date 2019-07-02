import { IPriority, IStatus } from '../../settings/models/settings.model';

export class Task {
    name: string;
    description?: string;
    createDate?: string;
    plannedTime?: number;
    usedTime?: number;
    priority?: string;
    status?: string;
    uid?: string;
    id?: number | string;
}

export class TaskView extends Task {
    priorityList?: IPriority;
    statusList?: IStatus;
    statusName?: string;
}
