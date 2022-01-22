import React, {useState} from 'react';
import './AddUserDialog.scss';
import {
    Autocomplete,
    Button,
    CircularProgress,
    debounce,
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
import {customFetch} from "../../../utils/actions";
import {backendUrl} from "../../../shared/options";
import {UserSearchModel} from "./usear-search.model"
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {logout} from "../../../store/auth/authSlice";
import {setSnackbar} from "../../../store/app/appSlice";

export interface AddUserDialogProps {
    id: string;
    keepMounted: boolean;
    open: boolean;
    boardId?: string;
    onClose: (value?: BoardUserModel) => void;
}

const AddUserDialog = (props: AddUserDialogProps) => {
    const {onClose, open, boardId, ...other} = props;
    const [userRole, setUserRole] = useState<BoardRoleEnum>(BoardRoleEnum.USER);
    const [value, setValue] = React.useState<UserSearchModel | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [lastValue, setLastValue] = React.useState('');
    const [options, setOptions] = React.useState<UserSearchModel[]>([]);
    const [listLoading, setListLoading] = React.useState(false);

    const board = useAppSelector(state => state.board.boards.find(board => board.id === boardId));
    const dispatch = useAppDispatch();

    const boardRoles = BoardUtils.getAssignableRoles();

    const handleClose = () => {
        onClose();
        setUserRole(BoardRoleEnum.USER);
        setValue(null);
    };

    const handleAdd = () => {
        if (value) {
            onClose({userId: value.userId, username: value.username, email: value.email, role: userRole});
        } else {
            onClose();
        }
        setUserRole(BoardRoleEnum.USER);
        setValue(null);
    };

    const fetch = React.useMemo(
        () =>
            debounce(
                (
                    request: { input: string },
                    callback: (results?: readonly UserSearchModel[]) => void,
                ) => {
                    customFetch(`${backendUrl}users?` + new URLSearchParams({
                        name: request.input,
                    }))
                        .then((res2: any) => res2.json())
                        .then((result: UserSearchModel[]) => {
                            result = result.filter(res => !board?.users.some(user => user.userId === res.userId))
                            callback(result);
                        }).catch(err => {
                        if (err.status === 401) {
                            dispatch(logout());
                        } else if (!String(err.status).match('^40.')) {
                            dispatch(setSnackbar({open: true, message: 'Server error!'}))
                        }
                        setListLoading(false)
                    });
                },
                200,
            ),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === '' || lastValue === inputValue) {
            setLastValue(inputValue);
            setListLoading(false);
            setOptions(value ? [value] : []);
            return undefined;
        }
        setLastValue(inputValue);

        setListLoading(true);
        fetch({input: inputValue}, (results?: readonly UserSearchModel[]) => {
            if (active) {
                let newOptions: UserSearchModel[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }
                setListLoading(false);
                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Dialog className={'AddUserDialog'} open={open} {...other} onClose={handleClose}>
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    please provide email or username:
                </DialogContentText>
                <Autocomplete
                    id="google-map-demo"
                    getOptionLabel={(option) =>
                        typeof option === 'string' ? option : option.label
                    }
                    filterOptions={(x) => x}
                    options={options}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    loading={listLoading}
                    value={value}
                    onChange={(event: any, newValue: UserSearchModel | null) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField className={'form-field'} {...params} label="Name" InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {listLoading ? <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}/>
                    )}
                />
                <div className="role-container">
                    <TextField
                        className={'form-field select-role'}
                        id="outlined-select-role"
                        select
                        label="Role"
                        value={userRole}
                        onChange={event => setUserRole(event.target.value as BoardRoleEnum)}
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
                <Button disabled={!value?.userId || !userRole} onClick={handleAdd}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddUserDialog;
