import React from 'react';
import './Authentication.scss';
import {Outlet} from "react-router-dom";

const Authentication = () => (
    <div className="Authentication" data-testid="Authentication">
        <Outlet/>
    </div>
);

export default Authentication;
