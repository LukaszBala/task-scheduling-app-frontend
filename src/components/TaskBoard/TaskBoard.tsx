import React, {useEffect, useState} from 'react';
import './TaskBoard.scss';
import TaskColumn from "../TaskColumn/TaskColumn";
import {DragDropContext} from "react-beautiful-dnd";
import {Button, FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Add, Search} from "@mui/icons-material";
import UserAvatar from "../UserAvatar/UserAvatar";
import {ColumnModel} from "../../store/models/column.model";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useParams} from "react-router";
import {TaskModel} from "../../store/models/task.model";
import CreateTaskDialog from "../CreateTaskDialog/CreateTaskDialog";

const users = [
    {name: 'maciek długi'},
    {name: 'henryk krótki'}
]

const onDragEnd = (result: any, columns: ColumnModel[], setColumns: any) => {
    if (!result.destination) return;
    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {

        const sourceIdx = columns.findIndex(col => col.id === source.droppableId);
        const destIdx = columns.findIndex(col => col.id === destination.droppableId);
        const sourceColumn = columns[sourceIdx];
        const destColumn = columns[destIdx];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        const newColumns = columns.slice();
        newColumns[sourceIdx] = {...newColumns[sourceIdx], items: sourceItems}
        newColumns[destIdx] = {...newColumns[destIdx], items: destItems}
        setColumns(newColumns);
    } else {
        const sourceIdx = columns.findIndex(col => col.id === source.droppableId);
        const column = columns[sourceIdx];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        const newColumns = columns.slice();
        newColumns[sourceIdx] = {...newColumns[sourceIdx], items: copiedItems}
        setColumns(newColumns);
    }
};

const TaskBoard = () => {
    const columnsFromStore = useAppSelector((state) => state.board.boards);
    const [columns, setColumns] = useState<ColumnModel[]>([]);
    const {id} = useParams();
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClose = (task?: TaskModel) => {
        if (task) {
            const columnIndex = columns.findIndex(column => column.id === task.columnId);
            const column = columns[columnIndex];
            const copiedItems = [...column.items];
            const id = `task_${column.id}_${copiedItems.length}`;
            const newColumns = columns.slice();
            copiedItems.splice(copiedItems.length - 1, 0, {...task, id});
            newColumns[columnIndex] = {...newColumns[columnIndex], items: copiedItems}
            setColumns(newColumns);
            console.log(task);
        }
        setOpen(false);
    };

    useEffect(() => {
        if (!id) {
            if (columnsFromStore.length) {
                setColumns(columnsFromStore[0].columns);
            }
            return;
        }

        const searchedBoard = columnsFromStore.find(board => board.id === id);

        if (searchedBoard) {
            setColumns(searchedBoard.columns);
            return;
        }
        setColumns(columnsFromStore[0].columns);
    }, [id])

    return (
        <div className="TaskBoard" data-testid="TaskBoard">
            <div className="task-board-content">
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
                <div className="columns">
                    <DragDropContext onDragEnd={(dragEl) => onDragEnd(dragEl, columns, setColumns)}>
                        {columns.map((column) => (
                            <TaskColumn {...column} key={String(column.id)}/>))}
                    </DragDropContext>
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
