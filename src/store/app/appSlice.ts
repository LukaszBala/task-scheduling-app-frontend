import {createSlice} from "@reduxjs/toolkit";

interface AppState {
    loading: boolean;
    snackBarOpen: boolean;
    snackBarMessage: string;
}

const initialState: AppState = {
    loading: false,
    snackBarOpen: false,
    snackBarMessage: ''
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, data) => {
            state.loading = data.payload
        },
        setSnackbar: (state, data) => {
            state.snackBarOpen = data.payload.open;
            state.snackBarMessage = data.payload.message ? data.payload.message : '';

        },
    }
})

export const {setLoading, setSnackbar} = appSlice.actions;

export default appSlice.reducer;
