import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BoardModel} from "./models/board.model";
import {TaskModel} from "./models/task.model";
import {ColumnModel} from "./models/column.model";
import {BoardUserModel} from "./models/board-user.model";

interface BoardState {
    boards: BoardModel[];
}

const initialState: BoardState = {
    boards: [
    ]
}

export const boardSlice = createSlice({
        name: 'board',
        initialState,
        reducers: {
            setBoards: (state, data) => {
                state.boards = data.payload
            },
            setSingleBoard: (state, data: PayloadAction<BoardModel>) => {
                const idx = state.boards.findIndex(board => board.id === data.payload.id);
                state.boards[idx] = data.payload;
            },
            addBoard: (state, data) => {
                const id = `temp_${state.boards.length}`;
                const newColumns = data.payload.columns.map((column: ColumnModel) => {
                    column.boardId = id;
                    return column;
                })
                state.boards.push({id, name: data.payload.name, columns: newColumns, users: []});
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
            },
            updateBoardUser: (state, data) => {
                const updatedUser: BoardUserModel = data.payload.user;
                const boardIndex = state.boards.findIndex(board => board.id === data.payload.boardId);
                if (boardIndex != null) {
                    const board = state.boards[boardIndex];
                    const userIndex = board.users.findIndex(user => user.userId === updatedUser.userId);
                    state.boards[boardIndex].users[userIndex] = updatedUser;
                }
            }
        }
    }
);

export const {
    setBoards,
    setSingleBoard,
    addBoard,
    updateTaskContent,
    addTask,
    moveTask,
    setBoardColumns,
    updateBoardUser
} = boardSlice.actions;

export default boardSlice.reducer;
