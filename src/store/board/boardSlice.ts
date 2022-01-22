import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BoardModel} from "./models/board.model";

interface BoardState {
    boards: BoardModel[];
}

const initialState: BoardState = {
    boards: []
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
            }
        }
    }
);

export const {
    setBoards,
    setSingleBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
