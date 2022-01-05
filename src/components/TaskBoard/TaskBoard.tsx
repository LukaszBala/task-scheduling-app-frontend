import React, {useState} from 'react';
import './TaskBoard.scss';
import TaskColumn from "../TaskColumn/TaskColumn";
import {DragDropContext} from "react-beautiful-dnd";

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
                <DragDropContext onDragEnd={(dragEl) => onDragEnd(dragEl, columns, setColumns)}>
                    {columns.map((column, index) => (
                        <TaskColumn item={column} itemId={index} key={String(index)}/>))}
                </DragDropContext>
            </div>

        </div>
    )
};

export default TaskBoard;
