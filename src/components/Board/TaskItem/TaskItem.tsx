import React from 'react';
import './TaskItem.scss';
import {TaskModel} from "../../../store/board/models/task.model";
import {useAppDispatch} from "../../../hooks";
import TaskDetailsDialog from "../TaskDetailsDialog/TaskDetailsDialog";
import {updateTaskContent} from '../../../store/board/boardSlice'

export interface TaskItemProps {
    item: TaskModel;
    boardId: string;
    dragging: boolean;
}

const TaskItem = (props: TaskItemProps) => {

    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClose = (task?: TaskModel) => {
        setOpen(false);
        if (task) {
            dispatch(updateTaskContent({task, boardId: props.boardId}));
        }
    };

    return (<>
            <div onClick={() => setOpen(true)} className={props.dragging ? "TaskItem dragging" : "TaskItem"}
                 data-testid="TaskItem">
                <div className="task-name">
                    {props.item.name}
                </div>

            </div>
            <TaskDetailsDialog
                id="register"
                keepMounted={false}
                task={props.item}
                open={open}
                onClose={handleClose}
            />
        </>

    )
};

export default TaskItem;
