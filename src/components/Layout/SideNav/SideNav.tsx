import React from 'react';
import './SideNav.scss';
import {Button} from "@mui/material";
import {useNavigate} from "react-router";
import {useAppSelector} from "../../../hooks";

const SideNav = () => {

    const navigate = useNavigate();
    const boards = useAppSelector(state => state.board.boards);
    return (
        <div className="SideNav" data-testid="SideNav">
            <div className="nav-btn">
                <Button onClick={() => navigate('home')}>Home</Button>
                <Button onClick={() => navigate('create')}>Create Board</Button>
            </div>
            <div className="boards-list">
                {boards.map((board, idx) => <Button key={idx} onClick={() => navigate(`board/${board.id}`)}>{board.name}</Button>)}

            </div>

        </div>
    )
}

export default SideNav;
