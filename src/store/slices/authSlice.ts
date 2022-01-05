import {createSlice} from "@reduxjs/toolkit";
import {User} from "../models/user";

interface AuthState {
    logged: boolean;
    token?: string;
    user?: User;
}

const initialState: AuthState = {
    logged: false,
    token: '',
    user: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.logged = true;
        },
        logout: (state) => {
            state.logged = false;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
