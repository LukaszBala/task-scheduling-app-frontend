import React from 'react';
import './App.scss';
import './shared/styles.scss';
import Header from "./components/Header/Header";
import {useAppSelector} from "./hooks";
import {createTheme, ThemeProvider} from "@mui/material";
import {useRoutes} from "react-router-dom";
import routes from "./routes";

function App() {

    const theme = createTheme({
        palette: {
            mode: 'dark'
        }
    });

    const logged = useAppSelector((state) => state.auth.logged)

    const routing = useRoutes(routes(logged));

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Header/>
                {routing}
            </div>
        </ThemeProvider>
    );
}

export default App;
