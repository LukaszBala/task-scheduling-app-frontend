import React from 'react';
import './RootContainer.scss';
import SideNav from "../SideNav/SideNav";
import {Outlet} from "react-router-dom";

const RootContainer = () => (
    <div className="RootContainer" data-testid="RootContainer">
        <SideNav/>
        <div className="root-container-content">
            <Outlet/>
        </div>
    </div>
);

export default RootContainer;
