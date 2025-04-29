import { Link, useLocation } from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import HamburgerMenuButton from "../../../buttons/HamburgerMenuButton.jsx";

export default function Sidebar() {
    const { user, logout, isMobile} = useContext(AuthContext);
    
    const title = document.title;
    const currentLocation = useLocation();
    const location = currentLocation.pathname;
    const navigation = [
        {name: "Главная", href: "/admin/dashboard", icon: "bi-house-door"},
        {name: "Герои", href: "/admin/heroes", icon: "bi-people"},
    ]

    return (
        <>
            {
            isMobile ?
                <MobileSidebar
                    logout={logout}
                    navigation={navigation}
                />
                :
                <DesktopSidebar
                    user={user}
                    logout={logout}
                    title={title}
                    location={location}
                    navigation={navigation}
                />
            }
        </>
    )
}

function DesktopSidebar({user, logout, title, location, navigation}) {
    return (
        <>
            <div className="sidebar flex flex-col justify-between sidebar w-[250px] lg:w-[300px] bg-[#fff] fixed h-full m-0 p-0">
                <div className="header flex flex-row items-center p-4 gap-4">
                    <div className="icon">
                        <img src="/favicon.ico" alt="logo" className="w-[50px] h-[50px] rounded-full"/>
                    </div>
                    <div className="name">
                        <span className="text-2xl text-black">{title}</span>
                    </div>
                </div>
                <ul className="menu p-4 flex flex-col gap-4">
                    {navigation.map((item) => (
                        <li key={item.name} className="flex">
                            {
                                <Link to={item.href}
                                      className={`${location === item.href ? 'bg-[#6884ff] text-white' : 'text-black'} p-4 rounded-lg hover:bg-[#7a92ff] hover:text-white cursor-pointer transition-all w-full flex items-center gap-2`}>
                                    <i className={`bi ${item.icon} text-inherit`}></i>
                                    {item.name}
                                </Link>
                            }
                        </li>
                    ))}
                </ul>
                <div className="user p-4">
                    <div
                        className="user-content p-2 rounded-2xl flex flex-row items-center justify-evenly gap-2 bg-[#dfe5ff]">
                        <div className="avatar">
                            <img
                                src={user?.image.startsWith('data:image') ? `${user?.image}` : '/avatar.png'}
                                alt="avatar"
                                className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full"/>
                        </div>
                        <div className="user-info flex flex-col gap-1">
                            <div className="name flex flex-col">
                                <p className="text-black">{user?.first_name}</p>
                                <p className="text-black">{user?.last_name}</p>
                            </div>
                        </div>
                        <button
                            className="p-3 lg:p-4 bg-[#9caeff] cursor-pointer rounded-full hover:bg-[#6884ff] transition-all"
                            onClick={logout}>
                            <i className="bi bi-box-arrow-right text-inherit text-base relative flex"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

function MobileSidebar({logout, navigation}) {

    const [isActive, setIsActive] = useState(false)

    return (
        <div className="header-box p-6">
            <div className={`bg-[#B1B1EE] p-2 rounded-3xl`}>
                <div
                    className={`head flex flex-row w-full justify-between items-center p-2 transition-all duration-500`}
                >
                    <img src="/menu-logo.svg" alt="" className={`w-[30px] h-[30px]`}/>
                    <div className="menu-btn" onClick={() => setIsActive(!isActive)}>
                        <HamburgerMenuButton active={isActive} color={`#fff`}/>
                    </div>
                </div>
                <nav
                    className={`navbar transition-all ease-out duration-500 overflow-hidden ${
                        isActive ? 'max-h-96 opacity-1' : 'max-h-0 opacity-0'
                    }`}
                >
                    <ul className="menu w-full flex flex-col gap-6 p-2">
                        {navigation.map((item) => (
                            <li key={item.name} className={`p-1`}>
                                {
                                    <Link
                                        to={item.href}
                                        className={`font-bold text-[18px]`}
                                    >
                                        {item.name}
                                    </Link>
                                }
                            </li>

                        ))}
                    </ul>
                    <button
                        className="p-4 lg:p-4 bg-[#8c85ff] cursor-pointer w-full rounded-2xl hover:bg-[#6884ff] transition-all"
                        onClick={logout}>
                        Выйти
                    </button>
                </nav>
            </div>
        </div>
    )
}