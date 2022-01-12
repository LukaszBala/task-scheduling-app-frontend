import {createSlice} from "@reduxjs/toolkit";
import {BoardModel} from "./models/board.model";
import {TaskModel} from "./models/task.model";
import {ColumnModel} from "./models/column.model";

const itemsFromBackend: TaskModel[] = [
    {id: 1, name: "First task", columnId: '0'},
    {id: 2, name: "Second task", columnId: '0'},
    {id: 3, name: "Third task", columnId: '0'},
    {id: 4, name: "Fourth task", columnId: '0'},
    {id: 5, name: "Fifth task", columnId: '0'},
    {id: 6, name: "First task", columnId: '0'},
    {id: 7, name: "Second task", columnId: '0'},
    {id: 8, name: "Third task", columnId: '0'},
    {id: 9, name: "Fourth task", columnId: '0'},
    {id: 10, name: "Fifth task", columnId: '0'},
    {id: 11, name: "First task", columnId: '0'},
    {id: 12, name: "Second task", columnId: '0'},
    {id: 13, name: "Third task", columnId: '0'},
    {id: 14, name: "Fourth task", columnId: '0'},
    {id: 15, name: "Fifth task", columnId: '0'}
];

const columnsFromBackend: ColumnModel[] = [
    {
        id: '0',
        boardId: '0',
        name: "Requested",
        items: itemsFromBackend
    },
    {
        id: '1',
        boardId: '0',
        name: "To do",
        items: []
    },
    {
        id: '2',
        boardId: '0',
        name: "In Progress",
        items: []
    },
    {
        id: '3',
        boardId: '0',
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
        name: 'Initial board',
        columns: columnsFromBackend
    }]
}

export const boardSlice = createSlice({
        name: 'board',
        initialState,
        reducers: {
            addBoard: (state, data) => {
                const id = `temp_${state.boards.length}`;
                const newColumns = data.payload.columns.map((column: ColumnModel) => {
                    column.boardId = id;
                    return column;
                })
                state.boards.push({id, name: data.payload.name, columns: newColumns});
            },
            addTask: (state, data) => {
                const newTask: TaskModel = data.payload.task;
                const boardIndex = state.boards.findIndex(board => board.id === data.payload.boardId);
                if (boardIndex != null) {
                    const board = state.boards[boardIndex];
                    const columnIndex = board.columns.findIndex(column => column.id === newTask.columnId);
                    newTask.id = `task_${newTask.columnId}_${board.columns.length}`;
                    state.boards[boardIndex].columns[columnIndex].items.push(newTask);
                }
            },
            updateTaskContent: (state, data) => {
                const updatedTask: TaskModel = data.payload.task;
                const boardIndex = state.boards.findIndex(board => board.id === data.payload.boardId);
                if (boardIndex != null) {
                    const board = state.boards[boardIndex];
                    const columnIndex = board.columns.findIndex(column => column.id === updatedTask.columnId);
                    const column = board.columns[columnIndex];
                    const oldTaskIndex = column.items.findIndex(item => item.id === updatedTask.id);
                    state.boards[boardIndex].columns[columnIndex].items[oldTaskIndex] = updatedTask;
                }
            },
            moveTask: (state, data) => {
                const sourceColumnId = data.payload.sourceId;
                const sourceTaskIndex = data.payload.sourceIndex;
                const destTaskIndex = data.payload.destIndex;
                const destColumnId = data.payload.destId;
                const boardId = data.payload.boardId;

                const boardIndex = state.boards.findIndex(board => board.id === boardId);
                const board = state.boards[boardIndex];

                if (sourceColumnId != destColumnId) {

                    const sourceColIndex = board.columns.findIndex(col => col.id === sourceColumnId);
                    const sourceColumn = board.columns[sourceColIndex];
                    const sourceItems = [...sourceColumn.items];
                    const [removed] = sourceItems.splice(sourceTaskIndex, 1);
                    const destColIndex = board.columns.findIndex(col => col.id === destColumnId);
                    const destColumn = board.columns[destColIndex];
                    const destItems = [...destColumn.items];
                    destItems.splice(destTaskIndex, 0, removed);

                    const newColumns = board.columns.slice();
                    newColumns[sourceColIndex] = {...newColumns[sourceColIndex], items: sourceItems}
                    newColumns[destColIndex] = {...newColumns[destColIndex], items: destItems}
                    state.boards[boardIndex].columns = newColumns;

                } else {
                    const colIndex = board.columns.findIndex(col => col.id === sourceColumnId);
                    const column = board.columns[colIndex];

                    const copiedItems = [...column.items];
                    const [removed] = copiedItems.splice(sourceTaskIndex, 1);
                    copiedItems.splice(destTaskIndex, 0, removed);
                    const newColumns = board.columns.slice();
                    newColumns[colIndex] = {...newColumns[colIndex], items: copiedItems}
                    state.boards[boardIndex].columns = newColumns;
                }

            },
            setBoardColumns: (state, data) => {
                const boardIndex = state.boards.findIndex(board => board.id === data.payload.boardId);
                state.boards[boardIndex].columns = data.payload.columns;
            }
        }
    }
);

export const {addBoard, updateTaskContent, addTask, moveTask, setBoardColumns} = boardSlice.actions;

export default boardSlice.reducer;
