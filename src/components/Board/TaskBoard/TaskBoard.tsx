import React, {useEffect, useState} from 'react';
import './TaskBoard.scss';
import TaskColumn from "../TaskColumn/TaskColumn";
import {DragDropContext} from "react-beautiful-dnd";
import {Button, FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Add, Search} from "@mui/icons-material";
import UserAvatar from "../../Users/UserAvatar/UserAvatar";
import {ColumnModel} from "../../../store/board/models/column.model";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {useParams} from "react-router";
import {TaskModel} from "../../../store/board/models/task.model";
import CreateTaskDialog from "../CreateTaskDialog/CreateTaskDialog";
import {BoardModel} from "../../../store/board/models/board.model";
import {addTask, setBoardColumns} from '../../../store/board/boardSlice';

const users = [
    {name: 'maciek długi'},
    {name: 'henryk krótki'}
]

const onDragEnd = (result: any, columns: ColumnModel[], setColumns: any, dispatch: any, board: any) => {
    if (!result.destination) return;
    const {source, destination} = result;
    // dispatch(moveTask({
    //     sourceId: source.droppableId,
    //     sourceIndex: source.index,
    //     destId: destination.droppableId,
    //     destIndex: destination.index,
    //     boardId: board.id
    // }))

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

        const newColumns = columns.slice();
        newColumns[sourceIdx] = {...newColumns[sourceIdx], items: sourceItems}
        newColumns[destIdx] = {...newColumns[destIdx], items: destItems}
        setColumns(newColumns);
        dispatch(setBoardColumns({columns: newColumns, boardId: board.id}))
    } else {
        const sourceIdx = columns.findIndex(col => col.id === source.droppableId);
        const column = columns[sourceIdx];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        const newColumns = columns.slice();
        newColumns[sourceIdx] = {...newColumns[sourceIdx], items: copiedItems}
        setColumns(newColumns);
        dispatch(setBoardColumns({columns: newColumns, boardId: board.id}))
    }
};

const TaskBoard = () => {
    const boards = useAppSelector((state) => state.board.boards);
    const [columns, setColumns] = useState<ColumnModel[]>([]);
    const [board, setBoard] = useState<BoardModel>();
    const {id} = useParams();
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClose = (task?: TaskModel) => {
        if (task) {
            dispatch(addTask({task, boardId: board?.id}))
        }
        setOpen(false);
    };

    useEffect(() => {
        if (!id) {
            if (boards.length) {
                setColumns(boards[0].columns);
                setBoard(boards[0])
            }
            return;
        }

        const searchedBoard = boards.find(board => board.id === id);

        if (searchedBoard) {
            setColumns(searchedBoard.columns);
            setBoard(searchedBoard);
            return;
        }
        setColumns(boards[0].columns);
        setBoard(boards[0]);
    }, [id, boards])

    return (
        <div className="TaskBoard" data-testid="TaskBoard">
            <div className="task-board-content">
                <div className="board-name-container">
                    {board?.name}
                </div>
                <div className={'board-top'}>
                    <div className="left-bar">
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="outlined-search">Search</InputLabel>
                            <OutlinedInput
                                id="outlined-search"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Search/>
                                    </InputAdornment>
                                }
                                label="Search"
                            />
                        </FormControl>
                        <div className="users-list">
                            {users.map(user => <UserAvatar name={user.name}/>)}

                        </div>
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
                onClose={handleClose}
            />
        </div>
    )
};

export default TaskBoard;
