import React, {useEffect, useState} from 'react';
import './App.scss';
import './shared/styles.scss';
import Header from "./components/Layout/Header/Header";
import {useAppDispatch, useAppSelector} from "./hooks";
import {Alert, Backdrop, CircularProgress, createTheme, Snackbar, Stack, ThemeProvider} from "@mui/material";
import {useRoutes} from "react-router-dom";
import routes from "./routes";
import {customFetch} from "./utils/actions";
import {backendUrl} from "./shared/options";
import {login, setUserData} from './store/auth/authSlice';
import {setBoards} from "./store/board/boardSlice";
import {setLoading, setSnackbar} from "./store/app/appSlice";

function App() {

    const theme = createTheme({
        palette: {
            mode: 'dark'
        }
    });

    const [initLoading, setInitLoading] = useState(true);
    const logged = useAppSelector((state) => state.auth.logged);
    const loadingOverlayEnabled = useAppSelector(state => state.app.loading);
    const snackBarOpened = useAppSelector(state => state.app.snackBarOpen);
    const snackBarMessage = useAppSelector(state => state.app.snackBarMessage);
    const token = useAppSelector((state) => state.auth.token);
    const routing = useRoutes(routes(logged));
    const dispatch = useAppDispatch();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        dispatch(setSnackbar({open: false}));
    };

    useEffect(() => {
        let localToken: any = '';
        if (!token) {
            localToken = localStorage.getItem('token');
        }
        if (token || localToken) {
            dispatch(setLoading(true))
            const properToken = token || localToken;
            customFetch(`${backendUrl}auth/user`, {
                method: 'GET',
                headers: {
                    'Authorization': properToken
                }
            }).then((res: any) => res.json()).then(async (res) => {
                dispatch(setUserData(res));
                await customFetch(`${backendUrl}board`, {
                    method: 'GET',
                    headers: {
                        'Authorization': properToken
                    }
                }).then((res2: any) => res2.json()).then((res2) => {
                    dispatch(setBoards(res2));
                }).catch((err) => {
                    if (!String(err.status).match('^40.')) {
                        dispatch(setSnackbar({open: true, message: 'Server error!'}))
                    }
                    dispatch(setLoading(false));
                    setInitLoading(false)
                })
                dispatch(setLoading(false));
                dispatch(login(properToken))
                setInitLoading(false);
            }).catch((err) => {
                if (!String(err.status).match('^40.')) {
                    dispatch(setSnackbar({open: true, message: 'Server error!'}))
                }
                dispatch(setLoading(false));
                setInitLoading(false)
            })
        } else {
            setInitLoading(false);
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                {!initLoading && <><Header/>{routing}</>}
            </div>
            <Backdrop
                sx={{color: '#fff', zIndex: 2000}}
                open={loadingOverlayEnabled}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Stack sx={{width: '100%'}}>
                <Snackbar sx={{width: 'calc(100% - 48px)'}} open={snackBarOpened} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="error" onClose={handleClose} sx={{width: '100%'}}>
                        {snackBarMessage}
                    </Alert>
                </Snackbar>
            </Stack>
        </ThemeProvider>
    );
}

export default App;
