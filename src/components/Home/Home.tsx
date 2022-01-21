import React, {FC} from 'react';
import './Home.scss';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate} from "react-router";
import {Add} from "@mui/icons-material";
import {Button} from "@mui/material";
import {customFetch} from "../../utils/actions";
import {setSnackbar} from "../../store/app/appSlice";
import {backendUrl} from "../../shared/options";

interface HomeProps {
}

const Home: FC<HomeProps> = () => {

    const boards = useAppSelector((state) => state.board.boards);
    const navigate = useNavigate();

    const dispatch =  useAppDispatch();

    const changeColors = async () => {
        await customFetch(`${backendUrl}users/updateColors`, {method: 'POST'});
    }

    const testSnackbar = async () => {
        await customFetch(`${backendUrl}`).catch((err) => {
            if (!String(err.status).match('^40.')) {
                dispatch(setSnackbar({open: true, message: 'Server error!'}))
            }
        })
    }

    return (
        <div className="Home">
            <div className="task-board-content">
                <div className="board-top-top-container">
                    Choose Board:
                </div>
                <div className="boards-container">
                    {boards.map((board, idx) => <div key={idx} className={'single-board'}
                                                     onClick={() => navigate(`../board/${board.id}`)}>{board.name}</div>)}
                    <Button className="add-board single-board" onClick={() => navigate('../create')}>Add <Add
                        className={'add-icon'}/></Button>
                    {/*<Button className="add-board single-board" onClick={() => changeColors()}>change user colors</Button>*/}
                    {/*<Button className="add-board single-board" onClick={() => testSnackbar()}>test error snackbar</Button>*/}
                </div>
            </div>
        </div>
    )
};

export default Home;
