import {ColumnModel} from "./column.model";
import {BoardUserModel} from "./board-user.model";

export interface BoardModel {
    id: string;
    name: string;
    createdBy?: string;
    createdDate?: string;
    users: BoardUserModel[];
    columns: ColumnModel[];
}
