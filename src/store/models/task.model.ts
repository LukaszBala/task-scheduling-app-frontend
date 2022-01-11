export interface TaskModel {
    id: number | string;
    name: string;
    description?: string;
    comments?: string[];
    assignee?: string;
    columnId?: string;
}
