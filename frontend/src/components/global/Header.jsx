import {Link, useLocation} from "react-router-dom";
import HamburgerMenuButton from "../buttons/HamburgerMenuButton.jsx";
import {useCallback, useRef, useState} from "react";

export default function Header({isMobile}) {
    const currentLocation = useLocation();
    const location = currentLocation.pathname;
    const modalRef = useRef(null);
    const windowRef = useRef(null);

    const toggleSearchModal = useCallback((show) => {
        if (!modalRef.current || !windowRef.current) return;

        if (show) {
          modalRef.current.classList.remove('hidden');
          setTimeout(() => {
            windowRef.current.classList.remove('-translate-y-full', 'opacity-0');
          }, 10);
        } else {
          windowRef.current.classList.add('-translate-y-full', 'opacity-0');
          setTimeout(() => {
            modalRef.current.classList.add('hidden');
          }, 200);
        }
        }, []);


    const navigation = [
        {name: "Главная", href: "/"},
        {name: "Новости", href: "/news"},
        {name: "Наши герои", href: "/heroes"},
        {name: "О проекте", href: "/about"},
    ]


    return (
        <header>
            {
                isMobile ?
                    <MobileHeader
                        navigation={navigation}
                        toggleSearchModal={toggleSearchModal}
                        windowRef={windowRef}
                        modalRef={modalRef}
                    />
                    :
                    <DesktopHeader
                        navigation={navigation}
                        location={location}
                        toggleSearchModal={toggleSearchModal}
                        windowRef={windowRef}
                        modalRef={modalRef}
                    />
            }
        </header>
    );
}


function DesktopHeader({navigation, location, toggleSearchModal, windowRef, modalRef}) {

    return (
        <div className="header-box flex items-center justify-between p-4">
            <a href="/" title="Logotype" className="flex-shrink-0">
                <img src="/logo.png" alt="Logo" className="w-16 h-16" />
            </a>

            <nav className="flex gap-2 bg-[#181a1e] p-4 rounded-2xl">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        replace={true}
                        className={`
                            rounded-2xl p-5 text-base/7 font-semibold
                            transition-all duration-200
                            ${location === item.href 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-200 hover:bg-blue-500 hover:text-white'}
                        `}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            <button
                className="flex items-center justify-center text-2xl p-4 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500 transition-all duration-200"
                onClick={() => toggleSearchModal(true)}
                aria-label="Открыть поиск"
            >
                <i className="bi bi-search flex" />
            </button>

            <SearchField toggleSearchModal={toggleSearchModal} windowRef={windowRef} modalRef={modalRef}/>
    </div>
  );
}



function MobileHeader({navigation, toggleSearchModal, windowRef, modalRef}) {
    const [isActive, setIsActive] = useState(false)

    return (
        <div className="header-box p-6">
            <div className={`bg-[#181a1e] p-2 rounded-3xl`}>
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
                        <li>
                            <button
                                className={`w-full bg-blue-600 p-4 rounded-2xl text-base`}
                                onClick={() => toggleSearchModal(true)}
                            >
                                Поиск
                            </button>
                        </li>
                    </ul>
                    <SearchField toggleSearchModal={toggleSearchModal} windowRef={windowRef} modalRef={modalRef} isMobile={true}/>
                </nav>
            </div>
        </div>
    )
}

function SearchField({modalRef, windowRef, toggleSearchModal, isMobile}) {
    return (
        <div
            ref={modalRef}
            className="search-modal fixed inset-0 hidden"
        >
            <div
                ref={windowRef}
                className="flex justify-center items-center gap-8 bg-[#181a1e] p-6 rounded-lg shadow-lg text-center opacity-0 -translate-y-full transition-all duration-300"
            >
                <input
                    type="text"
                    placeholder="Поиск героя, новостей..."
                    className={`${isMobile ? 'w-full' : 'w-1/2'} p-6 text-base text-white bg-transparent border-2 border-solid rounded-2xl`}
                    aria-label="Поиск"
                />
                <button
                    type="button"
                    className={`${isMobile && 'flex-shrink-0'} bg-blue-600 rounded-full hover:bg-blue-500 transition-all duration-200 p-4 cursor-pointer`}
                    onClick={() => toggleSearchModal(false)}
                    aria-label="Отменить поиск"
                >
                    <i className="bi bi-x-lg text-base flex"/>
                </button>
            </div>
        </div>
    )
}