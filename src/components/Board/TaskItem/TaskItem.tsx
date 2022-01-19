import React from 'react';
import './TaskItem.scss';
import {TaskModel} from "../../../store/board/models/task.model";
import {useAppDispatch} from "../../../hooks";
import TaskDetailsDialog from "../TaskDetailsDialog/TaskDetailsDialog";
import {setSingleBoard} from '../../../store/board/boardSlice'
import {setLoading} from '../../../store/app/appSlice';
import {customFetch} from "../../../utils/actions";
import {backendUrl} from "../../../shared/options";

export interface TaskItemProps {
    item: TaskModel;
    boardId: string;
    dragging: boolean;
}

const TaskItem = (props: TaskItemProps) => {

    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClose = async (task?: TaskModel) => {
        setOpen(false);
        if (task) {
            dispatch(setLoading(true));
            await customFetch(`${backendUrl}board/task/edit`, {
                method: 'POST',
                body: JSON.stringify({
                    boardId: props.boardId,
                    task
                })
            }).then()
                .then((res2: any) => res2.json())
                .then(result => {
                    dispatch(setSingleBoard(result));
                    dispatch(setLoading(false));
                }).catch(err => dispatch(setLoading(false)));
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
                boardId={props.boardId}
                open={open}
                onClose={handleClose}
            />
        </>

    )
};

export default TaskItem;
