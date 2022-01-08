import React from 'react';
import './TaskColumn.scss';
import {Draggable, Droppable} from "react-beautiful-dnd";
import TaskItem from "../TaskItem/TaskItem";

export interface ColumnModel {
    name: string;
    items: ColumnItemModel[]
}

export interface ColumnItemModel {
    id: number | string;
    content: string;
}

export interface TaskColumnModel {
    item: ColumnModel,
    itemId: string | number;
}

const TaskColumn = (props: TaskColumnModel) => {
    return (
        <div className="TaskColumn" data-testid="TaskColumn">
            <div className="task-column-title">
                {props.item.name}
            </div>
            <Droppable droppableId={String(props.itemId)} key={String(props.itemId)}>
                {(provided, snapshot) =>
                    <div {...provided.droppableProps}
                         ref={provided.innerRef}
                         className="task-column-content" style={{
                        background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey"
                    }}>
                        {props.item.items.map((item, idx) => <Draggable key={String(item.id)}
                                                                        draggableId={String(item.id)}
                                                                        index={idx}>{((provided, snapshot) => <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                                userSelect: "none",
                                backgroundColor: snapshot.isDragging
                                    ? "#263B4A"
                                    : "#456C86",
                                color: "white",
                                ...provided.draggableProps.style
                            }}
                        >
                            <TaskItem item={item}/>
                        </div>)}</Draggable>)}
                    </div>}

            </Droppable>
        </div>
    )
};

export default TaskColumn;
