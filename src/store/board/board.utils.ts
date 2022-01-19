import {BoardRoleEnum} from "./models/board-role.enum";

export class BoardUtils {
    static getAssignableRoles(): string[] {
        return Object.keys(BoardRoleEnum).filter(role => role !== BoardRoleEnum.CREATOR);
    }
}
