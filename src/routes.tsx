import {Navigate} from 'react-router-dom';
import RootContainer from "./components/RootContainer/RootContainer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Authentication from "./components/Authentication/Authentication";

const routes = (isLoggedIn: boolean) => [
    {
        path: '/app',
        element: isLoggedIn ? <RootContainer/> : <Navigate to="/register"/>,
        children: [
            // { path: '/dashboard', element: <Dashboard /> },
            // { path: '/account', element: <Account /> },
            {path: '', element: <Navigate to="/app"/>},
            // {
            //     path: 'member',
            //     element: <Outlet />,
            //     children: [
            //         { path: '/', element: <MemberGrid /> },
            //         { path: '/add', element: <AddMember /> },
            //     ],
            // },
        ],
    },
    {
        path: '/',
        element: !isLoggedIn ? <Authentication/> : <Navigate to="/app"/>,
        children: [
            {path: '/', element: <Login/>},
            {path: 'login', element: <Login/>},
            {path: 'register', element: <Register/>},
            {path: '*', element: <Navigate to={'/'}/>}
        ],
    },
];

export default routes;
