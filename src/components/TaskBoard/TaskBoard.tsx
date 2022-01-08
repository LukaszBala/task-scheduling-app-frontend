import React, {useState} from 'react';
import './TaskBoard.scss';
import TaskColumn from "../TaskColumn/TaskColumn";
import {DragDropContext} from "react-beautiful-dnd";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Search} from "@mui/icons-material";
import UserAvatar from "../UserAvatar/UserAvatar";

const itemsFromBackend = [
    {id: 1, content: "First task"},
    {id: 2, content: "Second task"},
    {id: 3, content: "Third task"},
    {id: 4, content: "Fourth task"},
    {id: 5, content: "Fifth task"}
];

const columnsFromBackend = [
    {
        name: "Requested",
        items: itemsFromBackend
    },
    {
        name: "To do",
        items: []
    },
    {
        name: "In Progress",
        items: []
    },
    {
        name: "Done",
        items: []
    }
]

const users = [
    {name: 'maciek długi'},
    {name: 'henryk krótki'}
]

const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[Number(source.droppableId)];
        const destColumn = columns[Number(destination.droppableId)];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        const newColumns = columns.slice();
        newColumns[Number(source.droppableId)] = {...newColumns[Number(source.droppableId)], items: sourceItems}
        newColumns[Number(destination.droppableId)] = {...newColumns[Number(destination.droppableId)], items: destItems}
        setColumns(newColumns);
    } else {
        const column = columns[Number(source.droppableId)];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        const newColumns = columns.slice();
        newColumns[Number(source.droppableId)] = {...newColumns[Number(source.droppableId)], items: copiedItems}
        setColumns(newColumns);
    }
};

const TaskBoard = () => {
    const [columns, setColumns] = useState(columnsFromBackend);

    return (
        <div className="TaskBoard" data-testid="TaskBoard">
            <div className="task-board-content">
                <div className={'board-top'}>
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="outlined-search">Search</InputLabel>
                        <OutlinedInput
                            id="outlined-search"
                            // value={values.password}
                            // onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        // onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    ><Search/>
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Search"
                        />
                    </FormControl>

                    <div className="users-list">
                        {users.map(user => <UserAvatar name={user.name}/>)}

                    </div>


                </div>
                <div className="columns">
                    <DragDropContext onDragEnd={(dragEl) => onDragEnd(dragEl, columns, setColumns)}>
                        {columns.map((column, index) => (
                            <TaskColumn item={column} itemId={index} key={String(index)}/>))}
                    </DragDropContext>
                </div>
            </div>

        </div>
    )
};

export default TaskBoard;
