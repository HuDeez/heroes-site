import {Outlet} from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar.jsx";
import {useState} from "react";


export default function AdminLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="wrapper admin min-h-screen max-md:flex-col">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="content w-full md:ml-[250px] lg:ml-[300px] max-md:flex-1">
                <Outlet/>
            </div>
        </div>
    );
}