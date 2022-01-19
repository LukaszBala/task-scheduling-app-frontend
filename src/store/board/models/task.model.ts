export interface TaskModel {
    id: number | string;
    name: string;
    columnId: string;
    description?: string;
    comments?: string[];
    assignee?: string;
    createdBy?: string;
    createdDate?: number;
}
