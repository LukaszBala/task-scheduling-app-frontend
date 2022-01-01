import React, {useState} from 'react';
import './App.scss';
import './shared/styles.scss';
import RootContainer from "./components/RootContainer/RootContainer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {

    const [logged, setLogged] = useState<boolean>(false);
    return (
        <div className="App">
            <Header/>
            {logged ? (<RootContainer/>) : (<Login/>)}
        </div>
    );
}

export default App;
