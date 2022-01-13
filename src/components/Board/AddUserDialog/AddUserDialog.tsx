import React, {useState} from 'react';
import './AddUserDialog.scss';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {BoardUserModel} from "../../../store/board/models/board-user.model";

export interface AddUserDialogProps {
    id: string;
    keepMounted: boolean;
    open: boolean;
    onClose: (value?: BoardUserModel) => void;
}

const initialUser = {username: '', email: '', role: '', userId: ''};

const AddUserDialog = (props: AddUserDialogProps) => {
    const {onClose, open, ...other} = props;

    const [user, setUser] = useState<BoardUserModel>(initialUser);
    const [search, setSearch] = useState<string>('');

    const handleClose = () => {
        onClose();
        setUser(initialUser);
    };

    const handleAdd = () => {
        onClose(user);
        setUser(initialUser);
    };

    const searchForUser = (query: string) => {

    }

    return (
        <Dialog open={open} {...other} onClose={handleClose}>
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    please provide email or username:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    value={search}
                    fullWidth
                    variant="standard"
                    onChange={(event) => searchForUser(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAdd}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddUserDialog;
