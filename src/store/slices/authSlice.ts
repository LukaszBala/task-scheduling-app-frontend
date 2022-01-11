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
        login: (state, data) => {
            state.logged = true;
            if (data.payload.token) {
                state.token = data.payload.token;
                localStorage.setItem('token', data.payload.token);
            }
        },
        logout: (state) => {
            state.logged = false;
            localStorage.removeItem('token');
        },
        setUserData: (state, data) => {
            state.user = data.payload;
        }
    }
})

export const {login, logout, setUserData} = authSlice.actions;

export default authSlice.reducer;
