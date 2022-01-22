import React, {useState} from 'react';
import './CreateColumnDialog.scss';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

export interface CreateColumnDialogProps {
    id: string;
    keepMounted: boolean;
    open: boolean;
    onClose: (value?: string) => void;
}

const CreateColumnDialog = (props: CreateColumnDialogProps) => {
    const {onClose, open, ...other} = props;

    const [name, setName] = useState<string>('');

    const handleClose = () => {
        onClose();
        setName('')
    };

    const handleAdd = () => {
        onClose(name);
        setName('')
    };

    return (
        <Dialog open={open} {...other} onClose={handleClose}>
            <DialogTitle>Add Column</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    please provide column name:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    fullWidth
                    variant="standard"
                    onChange={(event) => setName(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={!name} onClick={handleAdd}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}


export default CreateColumnDialog;
