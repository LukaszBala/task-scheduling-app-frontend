import React, {useEffect, useState} from 'react';
import './BoardSettings.scss';
import {Button, MenuItem, TextField} from "@mui/material";
import {Add, ArrowBack} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {BoardModel} from "../../../store/board/models/board.model";
import {useNavigate, useParams} from "react-router";
import {BoardUserModel} from "../../../store/board/models/board-user.model";
import {BoardRoleEnum} from "../../../store/board/models/board-role.enum";
import {setSingleBoard} from "../../../store/board/boardSlice";
import AddUserDialog from "../AddUserDialog/AddUserDialog";
import {BoardUtils} from "../../../store/board/board.utils";
import {setLoading, setSnackbar} from "../../../store/app/appSlice";
import {customFetch} from "../../../utils/actions";
import {backendUrl} from "../../../shared/options";
import {UserModel} from "../../../store/auth/user.model";
import {logout} from "../../../store/auth/authSlice";

const BoardSettings = () => {

    const boards = useAppSelector((state) => state.board.boards);
    const currentUser: UserModel | undefined = useAppSelector((state) => state.auth.user);
    const [board, setBoard] = useState<BoardModel>();
    const [open, setOpen] = useState(false);
    const {id} = useParams();
    const boardRoles = BoardUtils.getAssignableRoles();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const goToBoard = () => {
        navigate(`../board/${id}`)
    }

    const setUserRole = async (user: BoardUserModel, role: BoardRoleEnum) => {
        dispatch(setLoading(true));
        await customFetch(`${backendUrl}board/${board?.id}/change-user-role`, {
            method: 'POST',
            body: JSON.stringify({
                userId: user.userId, role
            })
        }).then()
            .then((res2: any) => res2.json())
            .then(result => {
                dispatch(setSingleBoard(result));
                dispatch(setLoading(false));
            }).catch(err => {
                if (err.status === 401) {
                    dispatch(logout());
                } else if (!String(err.status).match('^40.')) {
                    dispatch(setSnackbar({open: true, message: 'Server error!'}))
                }
                dispatch(setLoading(false))
            });
    }

    const addUser = async (user?: BoardUserModel) => {
        setOpen(false);
        if (user) {
            dispatch(setLoading(true));
            await customFetch(`${backendUrl}board/${board?.id}/add-user`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: user.userId, role: user.role
                })
            }).then()
                .then((res2: any) => res2.json())
                .then(result => {
                    dispatch(setSingleBoard(result));
                    dispatch(setLoading(false));
                }).catch(err => {
                    if (err.status === 401) {
                        dispatch(logout());
                    } else if (!String(err.status).match('^40.')) {
                        dispatch(setSnackbar({open: true, message: 'Server error!'}))
                    }
                    dispatch(setLoading(false))
                });
        }
    }

    useEffect(() => {
        const searchedBoard = boards.find(board => board.id === id);
        if (searchedBoard && !BoardUtils.adminOrCreator(searchedBoard.role)) {
            goToBoard();
        }

        if (searchedBoard) {
            setBoard(searchedBoard);
            return;
        }
    }, [id, boards, currentUser])

    return (
        <div className="BoardSettings">
            <div className="task-board-content">
                <div className="board-top-top-container">
                    {board?.name}
                    <Button onClick={() => goToBoard()}><ArrowBack className={'board-settings-icon'}/></Button>
                </div>
                <div className={'board-top'}>
                    <div className="left-bar">

                    </div>
                    <div className="right-bar">
                    </div>
                </div>
                <div className="config-users-container">
                    <div className="users-title">Users: <Button onClick={() => setOpen(true)}>Add User<Add/></Button>
                    </div>
                    {board?.users.map((user, index) =>
                        <div key={index} className={'user-item-container'}>
                            {user.username}

                            <div className="role-container">
                                <TextField
                                    className={'select-role'}
                                    id="outlined-select-role"
                                    select
                                    label="Role"
                                    value={user.role}
                                    disabled={board?.createdBy === user.userId}
                                    onChange={event => setUserRole(user, event.target.value as BoardRoleEnum)}
                                >
                                    {board?.createdBy !== user.userId ? boardRoles.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    )) : <MenuItem key={BoardRoleEnum.CREATOR} value={BoardRoleEnum.CREATOR}>
                                        {BoardRoleEnum.CREATOR}
                                    </MenuItem>}
                                </TextField>
                            </div>

                        </div>)}

                </div>
            </div>
            <AddUserDialog
                id="user"
                keepMounted
                boardId={board?.id}
                open={open}
                onClose={addUser}
            />
        </div>
    )
};

export default BoardSettings;
