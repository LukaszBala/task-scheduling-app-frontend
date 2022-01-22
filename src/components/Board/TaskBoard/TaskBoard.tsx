import React, {useEffect, useState} from 'react';
import './TaskBoard.scss';
import TaskColumn from "../TaskColumn/TaskColumn";
import {DragDropContext} from "react-beautiful-dnd";
import {Button} from "@mui/material";
import {Add, Settings} from "@mui/icons-material";
import {ColumnModel} from "../../../store/board/models/column.model";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {useNavigate, useParams} from "react-router";
import {TaskModel} from "../../../store/board/models/task.model";
import CreateTaskDialog from "../CreateTaskDialog/CreateTaskDialog";
import {BoardModel} from "../../../store/board/models/board.model";
import {setSingleBoard} from '../../../store/board/boardSlice';
import {setLoading, setSnackbar} from '../../../store/app/appSlice';
import {logout} from '../../../store/auth/authSlice';
import {customFetch} from "../../../utils/actions";
import {backendUrl} from "../../../shared/options";
import {BoardUtils} from "../../../store/board/board.utils";

const onDragEnd = async (result: any, columns: ColumnModel[], setColumns: any, dispatch: any, board: any) => {
    if (!result.destination) return;
    const {source, destination} = result;

    let newColumns;

    if (source.droppableId !== destination.droppableId) {

        const sourceIdx = columns.findIndex(col => col.id === source.droppableId);
        const destIdx = columns.findIndex(col => col.id === destination.droppableId);
        const sourceColumn = columns[sourceIdx];
        const destColumn = columns[destIdx];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        let [removed] = sourceItems.splice(source.index, 1);
        removed = {...removed};
        removed.columnId = destColumn.id;
        destItems.splice(destination.index, 0, removed);

        newColumns = columns.slice();
        newColumns[sourceIdx] = {...newColumns[sourceIdx], items: sourceItems}
        newColumns[destIdx] = {...newColumns[destIdx], items: destItems}
        setColumns(newColumns);
    } else {
        const sourceIdx = columns.findIndex(col => col.id === source.droppableId);
        const column = columns[sourceIdx];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        newColumns = columns.slice();
        newColumns[sourceIdx] = {...newColumns[sourceIdx], items: copiedItems}
        setColumns(newColumns);
    }

    if (newColumns) {
        dispatch(setLoading(true));
        await customFetch(`${backendUrl}board/task/move`, {
            method: 'POST',
            body: JSON.stringify({
                boardId: board?.id,
                sourceColumnId: source.droppableId,
                destColumnId: destination.droppableId,
                sourceTaskIndex: source.index,
                destTaskIndex: destination.index
            })
        }).then(async () => await customFetch(`${backendUrl}board/${board!.id}`)
            .then((res2: any) => res2.json())
            .then(result => {
                dispatch(setLoading(false));
                dispatch(setSingleBoard(result));
            }).catch(err => {
                    if (err.status === 401) {
                        dispatch(logout());
                    } else if (!String(err.status).match('^40.')) {
                        dispatch(setSnackbar({open: true, message: 'Server error!'}))
                    }
                    dispatch(setLoading(false));
                }
            )).catch(err => {
            if (err.status === 401) {
                dispatch(logout());
            } else if (!String(err.status).match('^40.')) {
                dispatch(setSnackbar({open: true, message: 'Server error!'}))
            }
            dispatch(setLoading(false));
        });
    }
};

const TaskBoard = () => {
    const [columns, setColumns] = useState<ColumnModel[]>([]);
    const [board, setBoard] = useState<BoardModel>();
    const {id} = useParams();
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const boards = useAppSelector((state) => state.board.boards);


    const addNewTask = async (task?: TaskModel) => {
        if (task) {
            dispatch(setLoading(true));
            await customFetch(`${backendUrl}board/task`, {
                method: 'POST', body: JSON.stringify({boardId: board?.id, task})
            }).then(async () => await customFetch(`${backendUrl}board/${board!.id}`)
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
                })
            ).catch(err => {
                if (err.status === 401) {
                    dispatch(logout());
                } else if (!String(err.status).match('^40.')) {
                    dispatch(setSnackbar({open: true, message: 'Server error!'}))
                }
                dispatch(setLoading(false));
            })

        }
        setOpen(false);
    };

    const goToBoardSettings = () => {
        if (id) {
            navigate(`../board-settings/${id}`);
        } else {
            navigate(`../board-settings/${board?.id}`)
        }
    }

    useEffect(() => {
        const searchedBoard = boards.find(board => board.id === id);

        if (searchedBoard) {
            setColumns(searchedBoard.columns);
            setBoard(searchedBoard);
            return;
        }
        navigate('../home');
    }, [id, boards])

    return (
        <div className="TaskBoard" data-testid="TaskBoard">
            <div className="task-board-content">
                <div className="board-top-top-container">
                    {board?.name}
                    {BoardUtils.adminOrCreator(board?.role) &&
                    <Button onClick={() => goToBoardSettings()}><Settings className={'board-settings-icon'}/></Button>}
                </div>
                <div className={'board-top'}>
                    <div className="left-bar">
                        {/*<FormControl sx={{m: 1, width: '25ch'}} variant="outlined">*/}
                        {/*    <InputLabel htmlFor="outlined-search">Search</InputLabel>*/}
                        {/*    <OutlinedInput*/}
                        {/*        id="outlined-search"*/}
                        {/*        endAdornment={*/}
                        {/*            <InputAdornment position="end">*/}
                        {/*                <Search/>*/}
                        {/*            </InputAdornment>*/}
                        {/*        }*/}
                        {/*        label="Search"*/}
                        {/*    />*/}
                        {/*</FormControl>*/}
                        {/*<div className="users-list">*/}
                        {/*    {board?.users.map((user, idx) => <UserAvatar key={idx} user={user}/>)}*/}

                        {/*</div>*/}
                    </div>
                    <div className="right-bar">
                        <Button onClick={() => setOpen(true)}>Add Task<Add/></Button>
                    </div>
                </div>

                <div className="column-container">
                    <div className="columns">
                        <DragDropContext
                            onDragEnd={(dragEl) => onDragEnd(dragEl, columns, setColumns, dispatch, board)}>
                            {columns.map((column) => (
                                <TaskColumn {...column} key={String(column.id)}/>))}
                        </DragDropContext>
                    </div>
                </div>
            </div>

            <CreateTaskDialog
                id="register"
                keepMounted
                open={open}
                columns={columns}
                onClose={addNewTask}
            />
        </div>
    )
};

export default TaskBoard;
