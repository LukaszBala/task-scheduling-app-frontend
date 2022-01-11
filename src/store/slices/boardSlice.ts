import {createSlice} from "@reduxjs/toolkit";
import {BoardModel} from "../models/board.model";
import {TaskModel} from "../models/task.model";
import {ColumnModel} from "../models/column.model";

const itemsFromBackend: TaskModel[] = [
    {id: 1, name: "First task"},
    {id: 2, name: "Second task"},
    {id: 3, name: "Third task"},
    {id: 4, name: "Fourth task"},
    {id: 5, name: "Fifth task"}
];

const columnsFromBackend: ColumnModel[] = [
    {
        id: '0',
        name: "Requested",
        items: itemsFromBackend
    },
    {
        id: '1',
        name: "To do",
        items: []
    },
    {
        id: '2',
        name: "In Progress",
        items: []
    },
    {
        id: '3',
        name: "Done",
        items: []
    }
]

interface BoardState {
    boards: BoardModel[];
}

const initialState: BoardState = {
    boards: [{
        id: '0',
        columns: columnsFromBackend
    }]
}

export const boardSlice = createSlice({
        name: 'board',
        initialState,
        reducers: {
            addBoard: (state, data, columns: any = data.payload) => {
                const id = `temp_${state.boards.length}`;
                state.boards.push({id, columns: columns});
            }
        }
    }
);

export const {addBoard} = boardSlice.actions;

export default boardSlice.reducer;
