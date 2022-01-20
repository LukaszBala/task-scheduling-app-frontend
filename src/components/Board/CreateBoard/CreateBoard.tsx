import React, {useState} from 'react';
import './CreateBoard.scss';
import {Button, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import CreateColumnDialog from "../CreateColumnDialog/CreateColumnDialog";
import {ColumnModel} from "../../../store/board/models/column.model";
import {useAppDispatch} from "../../../hooks";
import {customFetch} from "../../../utils/actions";
import {backendUrl} from "../../../shared/options";
import {setLoading} from '../../../store/app/appSlice';

const CreateBoard = () => {

    const [columns, setColumns] = useState<ColumnModel[]>([]);
    const [name, setName] = useState<string>('');
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClose = (name?: string) => {
        if (name) {
            const currColumns = [...columns];
            const id = `temp_${currColumns.length}`;
            currColumns.push({id, name, items: [], boardId: ''});
            setColumns(currColumns);
        }
        setOpen(false);
    };

    const saveBoard = () => {
        dispatch(setLoading(true))
        customFetch(`${backendUrl}board`, {
            method: 'POST',
            body: JSON.stringify({name, columns})
        }).then(() => dispatch(setLoading(false)));
        // dispatch(addBoard({name, columns}));
    }

    return (
        <div className="CreateBoard" data-testid="CreateBoard">
            <div className="create-board-content">
                <div className="board-name-container">
                    <TextField className={'board-name'} value={name} onChange={e => setName(e.target.value)}
                               id="board-name" label="Board Name" variant="standard"
                               inputProps={{style: {fontSize: 30}}}
                               InputLabelProps={{style: {fontSize: 30}}}/>
                </div>
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
                    {columns.map(((column, idx) =>
                        <div key={idx} className="task-column">
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
