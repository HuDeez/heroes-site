import { Link } from "react-router-dom";

export default function Footer({isMobile}) {
    const contacts = [
        { name: "Telegram", icon: "bx bxl-telegram", href: "https://t.me/hudeez", color: "bg-[#0088cc]", hover: "hover:bg-[#38b0ec]" },
        { name: "VKontakte", icon: "bx bxl-vk", href: "https://vk.com/hudeez", color: "bg-[#0077FF]", hover: "hover:bg-[#4896f1]" },
        { name: "YouTube", icon: "bx bxl-youtube", href: "https://www.youtube.com/@hakson3355", color: "bg-[#FF0000]", hover: "hover:bg-[#ff3b3b]" },
    ];

    const navigation = [
        { name: "Главная", href: "/" },
        { name: "Новости", href: "/news" },
        { name: "Наши герои", href: "/heroes" },
        { name: "О проекте", href: "/about" },
    ];

    return (
        <footer>
            {
                isMobile ?
                    <MobileFooter navigation={navigation} contacts={contacts}/>
                    :
                    <DesktopFooter navigation={navigation} contacts={contacts}/>
            }
        </footer>
    );
}

function DesktopFooter({navigation, contacts}) {
    return (
        <div className="footer-container">
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-10 p-10 bg-[#181a1e]">
                <a href="/" title="logotype">
                    <img src="/logo.png" alt="Starlyx Digital Logo" className="logo w-16 h-16"/>
                </a>

                <div className="copyright">
                    <span>© 2024 - 2025 Starlyx Digital <br/> Все права защищены.</span>
                </div>

                <div className="flex flex-col space-y-6">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href}
                              className="transition duration-200 hover:text-blue-600 font-black text-white">
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="contacts flex flex-col space-y-6">
                    <div className="flex flex-row gap-6">
                        {contacts.map((item) => (
                            <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"
                               className={`p-3 text-2xl flex items-center rounded-2xl transition duration-200 ${item.color} ${item.hover} text-white`}>
                                <i className={item.icon}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function MobileFooter({navigation, contacts}) {
    return (
        <div className={`footer-box`}>
            <div className={`grid grid-cols-1 gap-10 items-center text-center p-10 bg-[#181a1e]`}>
                <a href="/" title="logotype">
                    <img src="/logo.png" alt="Starlyx Digital Logo" className="logo w-16 h-16"/>
                </a>

                <div className="copyright">
                    <span>© 2024 - 2025 Starlyx Digital <br/> Все права защищены.</span>
                </div>

                <div className="footer-menu flex flex-col gap-5 items-center">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`font-bold`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="contacts flex flex-row gap-6 items-center justify-center">
                    {contacts.map((item) => (
                        <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"
                           className={`p-3 text-2xl flex items-center rounded-2xl transition duration-200 ${item.color} ${item.hover} text-white`}>
                            <i className={item.icon}></i>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )

}
