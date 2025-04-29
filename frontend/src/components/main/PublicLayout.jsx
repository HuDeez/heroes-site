import Header from "../global/Header.jsx";
import {Outlet} from "react-router-dom";
import ScrollButton from "../buttons/ScrollButton.jsx";
import Footer from "../global/Footer.jsx";
import useDeviceDetect from "../utils/DeviceDetect.jsx";

export default function PublicLayout() {
    const { isMobile } = useDeviceDetect()

    return (
        <div className="wrapper public flex-col gap-6">
            <Header isMobile={isMobile}/>
            <main className="flex flex-col justify-center items-center gap-4">
                <Outlet context={[isMobile]}/>
                {
                    !isMobile && <ScrollButton/>
                }
            </main>
            <Footer isMobile={isMobile}/>
        </div>
    );
}
