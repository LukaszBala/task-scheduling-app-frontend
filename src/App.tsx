import React from 'react';
import './App.scss';
import './shared/styles.scss';
import RootContainer from "./components/RootContainer/RootContainer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import {useAppSelector} from "./hooks";

function App() {

    const logged = useAppSelector((state) => state.auth.logged)

    return (
        <div className="App">
            <Header/>
            {logged ? (<RootContainer/>) : (<Login/>)}
        </div>
    );
}

export default App;
