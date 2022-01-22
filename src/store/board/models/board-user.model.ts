import {BoardRoleEnum} from "./board-role.enum";

export interface BoardUserModel {
    username: string;
    email: string;
    role: BoardRoleEnum;
    userId: string;
    color?: string;
}
