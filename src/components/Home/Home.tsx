import React, {FC} from 'react';
import './Home.scss';
import {useAppSelector} from "../../hooks";
import {useNavigate} from "react-router";
import {Add} from "@mui/icons-material";
import {Button} from "@mui/material";
import {customFetch} from "../../utils/actions";
import {backendUrl} from "../../shared/options";

interface HomeProps {
}

const Home: FC<HomeProps> = () => {

    const boards = useAppSelector((state) => state.board.boards);
    const navigate = useNavigate();

    const testEndpoint = () => {
        customFetch(`${backendUrl}board`);
    }

    return (
        <div className="Home">
            <div className="task-board-content">
                <div className="board-top-top-container">
                    Choose Board:
                    {/*{board?.name}*/}
                    {/*<Button onClick={() => goToBoard()}><ArrowBack className={'board-settings-icon'}/></Button>*/}
                </div>
                <div className="boards-container">
                    {boards.map((board, idx) => <div key={idx} className={'single-board'} onClick={() => navigate(`../board/${board.id}`)}>{board.name}</div>)}
                    <Button className="add-board single-board" onClick={() => navigate('../create')}>Add <Add className={'add-icon'}/></Button>
                    <Button className="add-board single-board" onClick={() => testEndpoint()}>test endpoint</Button>

                </div>
            </div>
        </div>
    )
};

export default Home;
