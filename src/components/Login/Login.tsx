import React, {useState} from 'react';
import './Login.scss';
import {useAppDispatch} from "../../hooks";
import {login} from '../../store/slices/authSlice';
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {customFetch} from "../../utils/actions";
import {backendUrl} from "../../shared/options";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router";

const Login = () => {

    const [userLogin, setUserLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await customFetch(`${backendUrl}auth/login`, {
            method: 'POST',
            body: JSON.stringify({login: userLogin, password})
        }).then((res: any) => res.json()).then((res) => {
            localStorage.setItem('token', res.access_token);
            setShowError(false);
            dispatch(login());
        }).catch((err: any) => {
            if (String(err.status).match('^40.')) {
                setShowError(true);
            } else {
                alert('server error');
                setShowError(false);
            }

        })
    }

    return (<div className="Login" data-testid="Login">
            <div className="login-container">

                <div className="option-wrapper">
                    <div className="login-form">
                        <div className="login-wrapper">
                            <h2>Please Log In</h2>
                            <form onSubmit={handleSubmit}>
                                <FormControl className={'form-field login-form'} sx={{m: 1, width: '25ch'}} variant="outlined">
                                    <InputLabel htmlFor="outlined-login">Login</InputLabel>
                                    <OutlinedInput
                                        id="outlined-login"
                                        type="text"
                                        value={userLogin}
                                        onChange={e => setUserLogin(e.target.value)}
                                        label="Login"
                                    />
                                </FormControl>
                                <FormControl className={'form-field password-form'} sx={{m: 1, width: '25ch'}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => handlePasswordChange(e)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <div className={showError ? 'show error' : 'error'}>
                                    Provided credentials are wrong
                                </div>
                                <div className='submit'>
                                    <Button variant={'contained'} type="submit">Submit</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="option-wrapper">
                    <div className="other-options">
                        <h2>Does not have an account yet?</h2>
                        <Button variant={'contained'} color={'success'} onClick={() => navigate('/register')}>register</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
