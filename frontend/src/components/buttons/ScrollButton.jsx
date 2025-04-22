import {useEffect, useState} from "react";

function ScrollButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };


        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className={`scroll fixed z-50 bottom-5 right-5 transition all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}>
            <button className="p-6 bg-blue-600 rounded-full hover:bg-blue-500 cursor-pointer transition duration-200 text-white" onClick={scrollToTop}>
                <i className="bi bi-arrow-up"></i>
            </button>
        </div>
    )
}


export default ScrollButton;