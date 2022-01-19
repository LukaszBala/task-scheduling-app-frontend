import React, {useState} from 'react';
import './AddUserDialog.scss';
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
import {BoardUserModel} from "../../../store/board/models/board-user.model";
import {BoardRoleEnum} from "../../../store/board/models/board-role.enum";
import {BoardUtils} from "../../../store/board/board.utils";

export interface AddUserDialogProps {
    id: string;
    keepMounted: boolean;
    open: boolean;
    onClose: (value?: BoardUserModel) => void;
}

const initialUser = {username: '', email: '', role: BoardRoleEnum.USER, userId: ''};

const AddUserDialog = (props: AddUserDialogProps) => {
    const {onClose, open, ...other} = props;

    const [user, setUser] = useState<BoardUserModel>(initialUser);
    const [search, setSearch] = useState<string>('');

    const boardRoles = BoardUtils.getAssignableRoles();

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

    const setUserRole = (user: BoardUserModel, role: BoardRoleEnum) => {
        const newUser = {...user, role};
        setUser(newUser);
    }

    return (
        <Dialog className={'AddUserDialog'} open={open} {...other} onClose={handleClose}>
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    please provide email or username:
                </DialogContentText>
                <TextField
                    className={'form-field'}
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
                <div className="role-container">
                    <TextField
                        className={'form-field select-role'}
                        id="outlined-select-role"
                        select
                        label="Role"
                        value={user.role}
                        onChange={event => setUserRole(user, event.target.value as BoardRoleEnum)}
                    >
                        {boardRoles.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAdd}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddUserDialog;
