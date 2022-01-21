import React, {useEffect, useState} from 'react';
import './CreateTaskDialog.scss';
import {TaskModel} from "../../../store/board/models/task.model";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";
import {ColumnModel} from "../../../store/board/models/column.model";

export interface CreateTaskDialogPros {
    id: string;
    keepMounted: boolean;
    open: boolean;
    columns: ColumnModel[],
    onClose: (value?: TaskModel) => void;
}

type SetPropertyFunction = <T extends keyof TaskModel>(
    property: T,
    value: TaskModel[T]
) => void;

const initState: TaskModel = {
    id: '',
    name: '',
    columnId: ''
}

const CreateTaskDialog = (props: CreateTaskDialogPros) => {
    const {onClose, open, columns, ...other} = props;

    const [task, setTask] = useState<TaskModel>(initState);

    const handleClose = () => {
        onClose();
        setTask(initState);
    };

    const handleAdd = () => {
        onClose(task);
        setTask(initState);
    };

    const setProperty: SetPropertyFunction = (property, value) => {
        setTask({
            ...task,
            [property]: value
        });
        return
    };

    useEffect(() => {
        if(columns && columns.length) {
            setProperty('columnId', String(columns[0].id));
        }
    }, [open])

    return (
        <Dialog className={'CreateTaskDialog'} open={open} {...other} onClose={handleClose}>
            <DialogTitle>Add Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    please provide Task details:
                </DialogContentText>
                <div className="dialog-content">
                    <TextField className={'task-dialog-text-field'}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={task?.name}
                        fullWidth
                        variant="standard"
                        onChange={(event) => setProperty('name', event.target.value)}
                    />
                    <TextField
                        className={'task-dialog-text-field'}
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        value={task?.description}
                        rows={4}
                        onChange={(event) => setProperty('description', event.target.value)}
                    />
                    <TextField
                        className={'task-dialog-text-field'}
                        id="outlined-select-currency"
                        select
                        label="Select"
                        value={task?.columnId || ''}
                        onChange={event => setProperty('columnId', event.target.value)}
                        helperText="Please select column"
                    >
                        {columns.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={!task.name || !task.columnId} onClick={handleAdd}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateTaskDialog;
