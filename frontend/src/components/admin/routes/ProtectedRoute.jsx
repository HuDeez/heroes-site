import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.jsx";

export const ProtectedRoute = ({redirectTo}) => {
    const {user} = useContext(AuthContext)
    return user ? <Outlet /> : <Navigate to={redirectTo} replace={true}/>;
}