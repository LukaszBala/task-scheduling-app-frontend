import React, {useEffect, useState} from 'react';
import './App.scss';
import './shared/styles.scss';
import Header from "./components/Header/Header";
import {useAppDispatch, useAppSelector} from "./hooks";
import {createTheme, ThemeProvider} from "@mui/material";
import {useRoutes} from "react-router-dom";
import routes from "./routes";
import {customFetch} from "./utils/actions";
import {backendUrl} from "./shared/options";
import {login, setUserData} from './store/slices/authSlice';

function App() {

    const theme = createTheme({
        palette: {
            mode: 'dark'
        }
    });

    const [loading, setLoading] = useState(true);
    const logged = useAppSelector((state) => state.auth.logged)
    const token = useAppSelector((state) => state.auth.token)
    const routing = useRoutes(routes(logged));
    const dispatch = useAppDispatch()

    useEffect(() => {
        let localToken: any = '';
        if (!token) {
            localToken = localStorage.getItem('token');
        }
        if (token || localToken) {
            const properToken = token || localToken;
            customFetch(`${backendUrl}auth/user`, {
                method: 'GET',
                headers: {
                    'Authorization': properToken
                }
            }).then((res: any) => res.json()).then((res) => {
                dispatch(setUserData(res));
                dispatch(login(properToken))
                setLoading(false);
            }).catch(() => {
                setLoading(false)
            })
        } else {
            setLoading(false);
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                {!loading && <><Header/>{routing}</>}
            </div>
        </ThemeProvider>
    );
}

export default App;
