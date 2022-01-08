import React from 'react';
import './Header.scss';
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {logout} from '../../store/slices/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    const dispatch = useAppDispatch()
    const logged = useAppSelector((state) => state.auth.logged)
    return (
        <nav className="Header" data-testid="Header">
            <h2 className={'title'}>Not Jira</h2>
            {logged && <div className={'header-right'}>
                <div className="user">
                    <AccountCircleIcon className={'user-icon'}/>
                </div>
                <Button variant={'contained'} color={'warning'} onClick={() => dispatch(logout())}>Logout</Button>
            </div>}

        </nav>
    )
};

export default Header;
