import React from 'react';
import './ConfirmationDialog.scss';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export interface ConfirmationDialogProps {
    id: string;
    keepMounted: boolean;
    header: string;
    message: string;
    confirm: string;
    reject: string;
    open: boolean;
    onClose: (value?: boolean) => void;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
    const {onClose, message, header, open, confirm, reject, ...other} = props;

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog
            sx={{'& .MuiDialog-paper': {width: '80%', maxHeight: 435}}}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle>{header}</DialogTitle>
            <DialogContent dividers>
                {message}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    {reject}
                </Button>
                <Button onClick={handleOk}>{confirm}</Button>
            </DialogActions>
        </Dialog>
    );
}
export default ConfirmationDialog;
