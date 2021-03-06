import {Action, configureStore, Dispatch, MiddlewareAPI} from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice";
import boardReducer from "./board/boardSlice";
import appReducer from "./app/appSlice";

const logger = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}


const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        board: boardReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
})

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
