import React from 'react';
import './App.scss';
import './shared/styles.scss';
import RootContainer from "./components/RootContainer/RootContainer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import {useAppSelector} from "./hooks";
import {createTheme, ThemeProvider} from "@mui/material";

function App() {

    const theme = createTheme({
        palette: {
            mode: 'dark'
        }
    });

    const logged = useAppSelector((state) => state.auth.logged)

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Header/>
                {logged ? (<RootContainer/>) : (<Login/>)}
            </div>
        </ThemeProvider>
    );
}

export default App;
