import React from 'react';
import './RootContainer.scss';
import SideNav from "../SideNav/SideNav";
import TaskBoard from "../TaskBoard/TaskBoard";

const RootContainer = () => (
    <div className="RootContainer" data-testid="RootContainer">
        <SideNav/>
        <div className="root-container-content">
            <TaskBoard/>
        </div>
    </div>
);

export default RootContainer;
