import React, {useEffect, useState} from 'react';
import './TaskDetailsDialog.scss';
import {TaskModel} from "../../../store/board/models/task.model";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import {Add, Clear, Save} from "@mui/icons-material";

export interface TaskDetailsDialogPros {
    id: string;
    keepMounted: boolean;
    open: boolean;
    task: TaskModel;
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

const availUsers = [
    {id: '1', name: 'Maciek'},
    {id: '2', name: 'Stasiek'}
]

const TaskDetailsDialog = (props: TaskDetailsDialogPros) => {
    const {onClose, open, task, ...other} = props;

    const [taskDetails, setTaskDetails] = useState<TaskModel>(initState);
    const [showCommentField, setShowCommentField] = useState(false);
    const [commentContent, setCommentContent] = useState('');

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
                        {availUsers.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        className={'task-dialog-text-field'}
                        id="outlined-multiline-static"
                        label="Description"
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAdd}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskDetailsDialog;
