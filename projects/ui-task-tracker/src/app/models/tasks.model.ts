export class Task {
    id: number;
    name: string;
    description: string;
    createDate: number;
    plannedTime: number;
    usedtime: number;
    priority: number;
    status: number;
    uid?: string;
}

export interface Itasks {
    tasks: Task[];
}
