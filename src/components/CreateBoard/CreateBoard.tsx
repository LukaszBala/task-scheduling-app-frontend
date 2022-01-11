import React, {useState} from 'react';
import './CreateBoard.scss';
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import CreateColumnDialog from "../CreateColumnDialog/CreateColumnDialog";
import {ColumnModel} from "../../store/models/column.model";
import {useAppDispatch} from "../../hooks";
import {addBoard} from '../../store/slices/boardSlice';

const CreateBoard = () => {

    const [columns, setColumns] = useState<ColumnModel[]>([]);
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClose = (name?: string) => {
        if (name) {
            const currColumns = [...columns];
            const id = `temp_${currColumns.length}`;
            currColumns.push({id, name, items: []});
            setColumns(currColumns);
        }
        setOpen(false);
    };

    const saveBoard = () => {
        dispatch(addBoard(columns));
    }

    return (
        <div className="CreateBoard" data-testid="CreateBoard">
            <div className="create-board-content">
                <div className={'board-top'}>
                    <Button className="add-column" onClick={() => setOpen(true)} variant={'contained'}>
                        <div className={'add-copy'}>
                            Add column
                        </div>
                        <Add className={'add-icon'}/>
                    </Button>
                    <Button className={'save-btn'} onClick={() => saveBoard()} color={'success'}
                            variant={'contained'}>Save</Button>

                </div>

                <div className="columns">
                    {columns.map((column =>
                        <div className="task-column">
                            <div className="task-column-title">
                                {column.name}
                            </div>
                            <div
                                className="task-column-content">
                            </div>
                        </div>))}
                </div>
            </div>
            <CreateColumnDialog
                id="register"
                keepMounted
                open={open}
                onClose={handleClose}
            />
        </div>
    )
};

export default CreateBoard;
