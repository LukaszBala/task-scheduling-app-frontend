import React, {useState} from 'react';
import './Register.scss';
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useNavigate} from "react-router";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {customFetch} from "../../utils/actions";
import {backendUrl} from "../../shared/options";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const Register = () => {
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();


    const handleClose = (value?: boolean) => {
        setOpen(false);
        if (value) {
            navigate('/login');
        }
    };

    const checkPassword = (value: string) => {
        setRepeatPassword(value);

    }

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
        await customFetch(`${backendUrl}auth/register`, {
            method: 'POST',
            body: JSON.stringify({email, username, password})
        }).then().then(() => {
            setShowError(false);
            setOpen(true);
        }).catch((err: any) => {
            if (String(err.status).match('^40.')) {
                setShowError(true);
            } else {
                console.log(err);
                alert('server error');
                setShowError(false);
            }

        })
    }

    return (<div className="Register" data-testid="Register">
        <div className="register-container">

            <div className="option-wrapper">
                <div className="register-form">
                    <div className="register-wrapper">
                        <h2>Please fill the remaining form</h2>
                        <form autoComplete={'off'} onSubmit={handleSubmit}>
                            <FormControl className={'form-field email-form'} sx={{m: 1, width: '25ch'}}
                                         variant="outlined">
                                <InputLabel htmlFor="outlined-email">Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    label="Email"
                                />
                            </FormControl>
                            <FormControl className={'form-field username-form'} sx={{m: 1, width: '25ch'}}
                                         variant="outlined">
                                <InputLabel htmlFor="outlined-username">Username</InputLabel>
                                <OutlinedInput
                                    id="outlined-username"
                                    autoComplete={'off'}
                                    type="text"
                                    value={username}
                                    onChange={e => setUserName(e.target.value)}
                                    label="Username"
                                />
                            </FormControl>
                            <FormControl className={'form-field password-form'} sx={{m: 1, width: '25ch'}}
                                         variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    autoComplete={'off'}
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
                            <FormControl className={'form-field password-form'} sx={{m: 1, width: '25ch'}}
                                         variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password-repeat">Repeat Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-repeat"
                                    type={showPassword ? 'text' : 'password'}
                                    value={repeatPassword}
                                    onChange={e => checkPassword(e.target.value)}
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
                                    label="Repeat Password"
                                />
                            </FormControl>
                            <div className={showError ? 'show error' : 'error'}>
                                Provided credentials are wrong
                            </div>
                            <div className='submit'>
                                <Button variant={'contained'} color={'success'} type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="option-wrapper">
                <div className="other-options">
                    <h2>Already have an account?</h2>
                    <Button variant={'contained'} onClick={() => navigate('/login')}>Login</Button>
                </div>
            </div>
        </div>
        <ConfirmationDialog
            id="register"
            keepMounted
            open={open}
            onClose={handleClose}
            header={'Registered Successfully'}
            message={'Do You want to be redirected to login?'}
            confirm={'Yes'}
            reject={'No'}
        />
    </div>);
}

export default Register;
