import {ColumnModel} from "./column.model";
import {BoardUserModel} from "./board-user.model";

export interface BoardModel {
    id: string;
    name: string;
    users: BoardUserModel[];
    columns: ColumnModel[];
}
