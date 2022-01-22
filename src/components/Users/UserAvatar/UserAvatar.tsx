import React from 'react';
import './UserAvatar.scss';
import {BoardUserModel} from "../../../store/board/models/board-user.model";
import {ColorUtils} from "../../../utils/color.utils";

const UserAvatar = (props: { user?: BoardUserModel }) => {
    return (
        <>
            {
                props.user ?
                    <div className="UserAvatar" data-testid="UserAvatar"
                         style={{background: props.user?.color, color: ColorUtils.isColorBright(props.user!.color!) ? 'black': 'white'}}>
                        {props.user?.username.split(" ").map((n) => n[0]).join("")}
                        <div className="tooltip">
                            <div className="tooltip-name">
                                {props.user?.username}
                            </div>
                            <div className="tooltip-email">
                                {props.user?.email}
                            </div>
                        </div>
                    </div> : <div className="UserAvatar no-user"/>
            }
        </>
    );
}

export default UserAvatar;
