import React from 'react';
import './Header.scss';
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {logout} from '../../../store/auth/authSlice';
import {useNavigate} from "react-router";
import UserAvatar from "../../Users/UserAvatar/UserAvatar";
import {BoardUserModel} from "../../../store/board/models/board-user.model";

const Header = () => {
    const dispatch = useAppDispatch()
    const logged = useAppSelector((state) => state.auth.logged)
    const user = useAppSelector((state) => state.auth.user)
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        dispatch(logout());
    };
    return (
        <nav className="Header" data-testid="Header">
            <h2 className={'title'}>Not Jira</h2>
            {logged && <div className={'header-right'}>
                <div className="user">
                    <UserAvatar user={user as BoardUserModel}/>
                    {user?.username}
                </div>
                <Button variant={'contained'} color={'warning'} onClick={() => handleLogout()}>Logout</Button>
            </div>}

        </nav>
    )
}

export default Header;
