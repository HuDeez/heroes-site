import {Outlet} from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar.jsx";


export default function AdminLayout() {

    return (
        <div className="wrapper admin">
            <Sidebar />
            <div className="content w-full ml-[300px]">
                <Outlet />
            </div>
        </div>
    );
}