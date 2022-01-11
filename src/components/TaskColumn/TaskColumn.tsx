import React from 'react';
import './TaskColumn.scss';
import {Draggable, Droppable} from "react-beautiful-dnd";
import TaskItem from "../TaskItem/TaskItem";
import {ColumnModel} from "../../store/models/column.model";

const TaskColumn = (props: ColumnModel) => {
    return (
        <div className="TaskColumn" data-testid="TaskColumn">
            <div className="task-column-title">
                {props.name}
            </div>
            <Droppable droppableId={String(props.id)} key={String(props.id)}>
                {(provided, snapshot) =>
                    <div {...provided.droppableProps}
                         ref={provided.innerRef}
                         className="task-column-content" style={{
                        background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey"
                    }}>
                        {props.items.map((item, idx) => <Draggable key={String(item.id)}
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
