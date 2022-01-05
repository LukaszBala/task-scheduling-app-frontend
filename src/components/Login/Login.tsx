import React, {useState} from 'react';
import './Login.scss';
import {useAppDispatch} from "../../hooks";
import {login} from '../../store/slices/authSlice';

const Login = () => {

    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }
    return (<div className="Login" data-testid="Login">
        <div className="login-container">

            <div className="option-wrapper">
                <div className="login-form">
                    <div className="login-wrapper">
                        <h2>Please Log In</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <p>Username</p>
                                <input type="text" onChange={e => setUserName(e.target.value)}/>
                            </label>
                            <label>
                                <p>Password</p>
                                <input type="password" onChange={e => setPassword(e.target.value)}/>
                            </label>
                            <div className={showError ? 'show error' : 'error'}>
                                Provided credentials are wrong
                            </div>
                            <div className='submit'>
                                <button className='submit-btn' type="submit" onClick={() => dispatch(login())}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="option-wrapper">
                <div className="other-options">
                    <h2>Does not have an account yet?</h2>
                    <button className="register-btn">register</button>
                </div>
            </div>
        </div>
    </div>);
}

export default Login;
