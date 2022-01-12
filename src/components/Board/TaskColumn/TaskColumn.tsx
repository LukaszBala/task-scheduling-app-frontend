import React from 'react';
import './TaskColumn.scss';
import {Draggable, Droppable} from "react-beautiful-dnd";
import TaskItem from "../TaskItem/TaskItem";
import {ColumnModel} from "../../../store/board/models/column.model";

const TaskColumn = (props: ColumnModel) => {
    return (
        <div className="TaskColumn" data-testid="TaskColumn">
            <div className="task-column-title">
                {props.name}
            </div>
            <Droppable droppableId={String(props.id)} key={String(props.id)}>
                {(provided, snapshot) =>
                    <div
                        className="task-column-content"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey"
                        }}>
                        {props.items.map((item, idx) =>
                            <Draggable
                                key={String(item.id)}
                                draggableId={String(item.id)}
                                index={idx}>{((provided, snapshot) =>
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        userSelect: "none",
                                        // backgroundColor: snapshot.isDragging
                                        //     ? "whitesmoke"
                                        //     : "whitesmoke",
                                        ...provided.draggableProps.style
                                    }}
                                >
                                    <TaskItem boardId={props.boardId} dragging={snapshot.isDragging} item={item}/>
                                </div>)}</Draggable>)}
                    </div>}

            </Droppable>
        </div>
    )
};

export default TaskColumn;
