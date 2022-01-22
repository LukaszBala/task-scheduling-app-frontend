import React, {useEffect, useState} from 'react';
import './TaskDetailsDialog.scss';
import {TaskModel} from "../../../store/board/models/task.model";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import {Add, Clear, Save} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {setLoading, setSnackbar} from '../../../store/app/appSlice';
import {customFetch} from "../../../utils/actions";
import {backendUrl} from "../../../shared/options";
import {setSingleBoard} from "../../../store/board/boardSlice";
import {BoardUtils} from "../../../store/board/board.utils";
import {logout} from "../../../store/auth/authSlice";

export interface TaskDetailsDialogPros {
    id: string;
    keepMounted: boolean;
    open: boolean;
    task: TaskModel;
    boardId: string;
    onClose: (value?: TaskModel) => void;
}

type SetPropertyFunction = <T extends keyof TaskModel>(
    property: T,
    value: TaskModel[T]
) => void;

const initState: TaskModel = {
    id: '',
    name: '',
    columnId: '',
    assignee: ''
}

const TaskDetailsDialog = (props: TaskDetailsDialogPros) => {
    const {onClose, open, boardId, task, ...other} = props;

    const [taskDetails, setTaskDetails] = useState<TaskModel>(initState);
    const [showCommentField, setShowCommentField] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const board = useAppSelector(state => state.board.boards.find(board => board.id === boardId))
    const currentUser = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch();

    const handleClose = () => {
        onClose();
        setShowCommentField(false);
        setCommentContent('');
    };

    const handleAdd = () => {
        onClose(taskDetails);
        setShowCommentField(false);
        setCommentContent('');
    };

    const setProperty: SetPropertyFunction = (property, value) => {
        setTaskDetails({
            ...taskDetails,
            [property]: value
        });
    };

    const cancelAddComment = () => {
        setShowCommentField(false);
        setCommentContent('');
    }

    const addComment = () => {
        const comments = taskDetails.comments;
        if (comments && comments.length) {
            const newComments = comments.slice();
            newComments.push(commentContent);
            setProperty('comments', newComments);
        } else {
            const newComments = [commentContent];
            setProperty('comments', newComments);
        }
        setShowCommentField(false);
        setCommentContent('');
    }

    const deleteTask = async () => {
        dispatch(setLoading(true));
        await customFetch(`${backendUrl}board/task/delete`, {
            method: 'POST',
            body: JSON.stringify({
                boardId: board?.id, taskId: taskDetails.id
            })
        }).then()
            .then((res2: any) => res2.json())
            .then(result => {
                dispatch(setSingleBoard(result));
                dispatch(setLoading(false));
            }).catch(err => {
                if (err.status === 401) {
                    dispatch(logout());
                } else if (!String(err.status).match('^40.')) {
                    dispatch(setSnackbar({open: true, message: 'Server error!'}))
                }
                dispatch(setLoading(false));
                handleClose();
            });
        handleClose();
    }

    useEffect(() => {
        if (open) {
            if (task) {
                setTaskDetails({...task});
            }
            setShowCommentField(false);
            setCommentContent('');
        }
        if (!open) {
            setTimeout(() => {
                setShowCommentField(false);
                setCommentContent('');
            })

        }
    }, [open])

    return (
        <Dialog className={'TaskDetailsDialog'} open={open} {...other} onClose={handleClose}>
            <DialogTitle>{taskDetails.name}</DialogTitle>
            <DialogContent>
                <div className="dialog-content">
                    <TextField
                        className={'task-dialog-text-field'}
                        id="outlined-select-currency"
                        select
                        label="Assignee"
                        value={taskDetails?.assignee || ''}
                        onChange={event => setProperty('assignee', event.target.value)}
                        helperText="Please select assignee"
                    >
                        <MenuItem className={'no-assignee'} value={''}>
                            No assignee
                        </MenuItem>
                        {board?.users.map((option) => (
                            <MenuItem key={option.userId} value={option.userId}>
                                {option.username}
                            </MenuItem>
                        ))}

                    </TextField>
                    <TextField
                        className={'task-dialog-text-field'}
                        id="outlined-multiline-static"
                        label="Description"
                        disabled={currentUser?.userId !== taskDetails?.createdBy && !BoardUtils.adminOrCreator(board?.role)}
                        multiline
                        value={taskDetails?.description}
                        rows={4}
                        onChange={(event) => setProperty('description', event.target.value)}
                    />
                    <div className="task-comment-section">
                        <div className="comment-label">
                            Comments:
                        </div>
                        <div className="comments">
                            {taskDetails.comments?.map((comment, index) =>
                                <div className={'comment-content'} key={index}>
                                    {comment}
                                </div>)
                            }
                        </div>
                        {showCommentField && <TextField
                            className={'task-dialog-text-field'}
                            id="outlined-multiline-static"
                            label="comment"
                            multiline
                            value={commentContent}
                            rows={4}
                            onChange={(event) => setCommentContent(event.target.value)}
                        />}

                        <div className="comment-actions">
                            {!showCommentField ?
                                <Button className="add-comment" onClick={() => setShowCommentField(true)}>
                                    Add comment<Add/>
                                </Button> :
                                <>
                                    <Button className="cancel-comment"
                                            onClick={cancelAddComment}>Cancel<Clear/></Button>
                                    <Button className="save-comment" onClick={addComment}>Save comment<Save/></Button>
                                </>}

                        </div>

                    </div>

                </div>

            </DialogContent>
            <DialogActions>
                <div className={'bottom-btn-container'}>
                    {(currentUser?.userId === taskDetails?.createdBy || BoardUtils.adminOrCreator(board?.role)) &&
                    <Button onClick={deleteTask}>delete</Button>}
                    <div className="right-btns">
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleAdd}>Save</Button>
                    </div>
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default TaskDetailsDialog;
