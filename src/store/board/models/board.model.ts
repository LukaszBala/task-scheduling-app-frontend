import {ColumnModel} from "./column.model";
import {BoardUserModel} from "./board-user.model";
import {BoardRoleEnum} from "./board-role.enum";

export interface BoardModel {
    id: string;
    name: string;
    role?: BoardRoleEnum;
    createdBy?: string;
    createdDate?: string;
    users: BoardUserModel[];
    columns: ColumnModel[];
}
