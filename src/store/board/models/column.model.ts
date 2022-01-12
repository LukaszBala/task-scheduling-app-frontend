import {TaskModel} from "./task.model";

export interface ColumnModel {
    id: string;
    boardId: string;
    name: string;
    items: TaskModel[]
}
