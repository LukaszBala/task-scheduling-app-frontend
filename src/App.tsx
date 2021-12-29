import React from 'react';
import './App.scss';
import RootContainer from "./components/RootContainer/RootContainer";
import Header from "./components/Header/Header";

function App() {
    return (
        <div className="App">
            <Header/>
            <RootContainer/>
        </div>
    );
}

export default App;
