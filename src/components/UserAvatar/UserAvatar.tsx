import React from 'react';
import './UserAvatar.scss';

const UserAvatar = (props: { name: string, avatar?: string }) => (
    <div className="UserAvatar" data-testid="UserAvatar" style={{background: '#' + Math.floor(Math.random()*16777215).toString(16)}}>
        {props.name.split(" ").map((n)=>n[0]).join("")}
    </div>
);

export default UserAvatar;
