import {createSlice} from "@reduxjs/toolkit";

interface AppState {
    loading: boolean;
}

const initialState: AppState = {
    loading: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, data) => {
            state.loading = data.payload
        },
    }
})

export const {setLoading} = appSlice.actions;

export default appSlice.reducer;
