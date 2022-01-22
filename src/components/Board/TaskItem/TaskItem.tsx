import React, {useEffect} from 'react';
import './TaskItem.scss';
import {TaskModel} from "../../../store/board/models/task.model";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import TaskDetailsDialog from "../TaskDetailsDialog/TaskDetailsDialog";
import {setSingleBoard} from '../../../store/board/boardSlice'
import {setLoading, setSnackbar} from '../../../store/app/appSlice';
import {customFetch} from "../../../utils/actions";
import {backendUrl} from "../../../shared/options";
import UserAvatar from "../../Users/UserAvatar/UserAvatar";
import {BoardUserModel} from "../../../store/board/models/board-user.model";
import {logout} from "../../../store/auth/authSlice";

export interface TaskItemProps {
    item: TaskModel;
    boardId: string;
    dragging: boolean;
}

const TaskItem = (props: TaskItemProps) => {

    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState<BoardUserModel | undefined>();
    const dispatch = useAppDispatch();
    const board = useAppSelector(state => state.board.boards.find(board => board.id === props.boardId))

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
                }).catch(err => {
                    if (err.status === 401) {
                        dispatch(logout());
                    } else {
                        if (!String(err.status).match('^40.')) {
                            dispatch(setSnackbar({open: true, message: 'Server error!'}))
                        }
                    }
                    dispatch(setLoading(false));
                });
        }
    };

    useEffect(() => {
        if (!board || !props.boardId || !props.item.assignee) {
            setUser(undefined);
            return;
        }
        const assignedUser = board.users.find(us => us.userId === props.item.assignee);
        if (assignedUser) {
            setUser(assignedUser);
        } else {
            setUser(undefined);
        }
    }, [board, props.boardId, props.item.assignee])

    return (<>
            <div onClick={() => setOpen(true)}
                 className={props.dragging ? "TaskItem dragging" : "TaskItem"}
                 data-testid="TaskItem">
                <div className="item-content">
                    <div className="task-name">
                        {props.item.name}
                    </div>
                    <div className="assignee-container">
                        <UserAvatar user={user}/>
                    </div>
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
