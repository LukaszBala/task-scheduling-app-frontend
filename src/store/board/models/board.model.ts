import {ColumnModel} from "./column.model";

export interface BoardModel {
    id: string;
    name: string;
    columns: ColumnModel[];
}
