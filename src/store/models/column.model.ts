import {TaskModel} from "./task.model";

export interface ColumnModel {
    id: number | string;
    name: string;
    items: TaskModel[]
}
