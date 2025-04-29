import {Link, useLocation, useNavigate} from "react-router-dom";
import HamburgerMenuButton from "../buttons/HamburgerMenuButton.jsx";
import {useCallback, useEffect, useRef, useState} from "react";
import apiClient from "../admin/api/client.jsx";

export default function Header({isMobile}) {
    const currentLocation = useLocation();
    const location = currentLocation.pathname;
    const modalRef = useRef(null);
    const windowRef = useRef(null);

    const toggleSearchModal = useCallback((show) => {
        if (!modalRef.current || !windowRef.current) return;

        if (show) {
            document.body.classList.add("fixed", 'w-full');
          modalRef.current.classList.remove('hidden');
          setTimeout(() => {
            windowRef.current.classList.remove('-translate-y-full', 'opacity-0');
          }, 10);
        } else {
            document.body.classList.remove("fixed", 'w-full');
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

            <SearchField
                toggleSearchModal={toggleSearchModal}
                windowRef={windowRef}
                modalRef={modalRef}
                isMobile={false}
            />
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
                    <SearchField
                        toggleSearchModal={toggleSearchModal}
                        windowRef={windowRef}
                        modalRef={modalRef}
                        isMobile={true}/>
                </nav>
            </div>
        </div>
    )
}

function SearchField({modalRef, windowRef, toggleSearchModal, isMobile}) {

    const navigate = useNavigate()
    const [searchResults, setSearchResults] = useState([])
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!query) return; // don't search if input is empty

        const delayDebounce = setTimeout(async () => {
          console.log('Sending search request for:', query);
          const fetch = await apiClient.get(`/search?request=${query}`);
            setSearchResults(fetch.data)
        }, 700); // 500 ms delay after user stops typing

    // Cleanup if user keeps typing (before 500ms)
    return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleClick = (heroesData) => {
        navigate(`/heroes/${heroesData.id}`, { state: { heroesData } });
    }

    return (
        <>
            <div
                ref={modalRef}
                className="search-modal fixed inset-0 hidden flex flex-col overflow-hidden z-10"
            >
                <div
                    ref={windowRef}
                    className="flex justify-center items-center gap-8 bg-[#181a1e] p-6 shadow-lg text-center opacity-0 -translate-y-full transition-all duration-300"
                >
                    <input
                        type="text"
                        placeholder="Поиск героя по имени, фамилии..."
                        className={`${isMobile ? 'w-full' : 'w-1/2'} p-6 text-base text-white bg-transparent border-2 border-solid rounded-2xl`}
                        aria-label="Поиск"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                    <button
                        type="button"
                        className={`${isMobile && 'flex-shrink-0'} bg-blue-600 rounded-full hover:bg-blue-500 transition-all duration-200 p-4 cursor-pointer`}
                        onClick={() => {
                            toggleSearchModal(false);
                            setQuery('');
                            setSearchResults(null)
                        }}
                        aria-label="Отменить поиск"
                    >
                        <i className="bi bi-x-lg text-base flex"/>
                    </button>
                </div>

                <div className={`bg-[#121317] flex-1 ${query === '' ? 'opacity-0 translate-y-1/2' : 'opacity-1 translate-y-0'} transition-all duration-500 ease-in-out`}>
                    <div className="lst grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center p-6 justify-between">
                        {
                            searchResults?.map((obj) => (
                                <div
                                    className={`p-2 bg-[#24262c] rounded-2xl hover:bg-[#323338] w-full text-center cursor-pointer transition-all duration-300 ease-in-out`}
                                    key={obj.id}
                                    onClick={() => {
                                        handleClick(obj);
                                        toggleSearchModal(false);
                                        setQuery('');
                                        setSearchResults(null);
                                    }}
                                >
                                    <div className="content-box flex flex-row items-center justify-between gap-2">
                                        <div className="avatar w-[80px] overflow-hidden flex-shrink-0">
                                            <img
                                                src={`/static/${obj.id}.png?v=${obj.timestamp}`}
                                                onError={(e) => e.target.src = `/unknown_soldier.jpg`}
                                                alt="avatar"
                                                className="w-full h-full object-cover rounded-full"/>
                                        </div>
                                        <div className="text-center w-full">
                                            <div className="title flex flex-col p-2 bg-[#1a1b1f] rounded-xl w-full mx-auto">
                                                <div className="name">
                                                    <h1 className={`text-white text-xl`}>{obj.name}</h1>
                                                </div>
                                                <div className="surname">
                                                    <h1 className={`text-white text-xl`}>{obj.surname}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </>

    )
}