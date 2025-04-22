import {QuestionCircleOutlined} from "@ant-design/icons";
import { useOutletContext } from "react-router-dom";

export default function NotFoundCard() {
    const [isMobile] = useOutletContext();
    return (
        <>
            {
                isMobile ?
                <MobileNotFoundCard />
                :
                <DesktopNotFoundCard />
            }
        </>
    )
}


function DesktopNotFoundCard() {
    return (
        <>
            <div className="title">
                <h1 className="text-6xl p-4">404</h1>
            </div>
            <div className="flex p-16 justify-center w-full">
                <div className="bg-[#181a1e] flex flex-col justify-center items-center p-8 w-1/2 rounded-2xl space-y-5">
                    <div className="image">
                        <QuestionCircleOutlined style={{fontSize: "56px", color: "#fff"}} />
                    </div>
                    <div className="description text-center text-xl">
                        <p className="text-white">Извините, данная страница недоступна</p>
                    </div>
                    <div className="buttons p-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-center transition all duration-200">
                        <a href="/" className="text-white">Вернуться домой</a>
                    </div>
                </div>
            </div>
        </>
    )
}


function MobileNotFoundCard() {
    return (
        <>
            <div className="title">
                <h1 className="text-6xl p-4">404</h1>
            </div>
            <div className="w-full p-6">
                <div className="bg-[#181a1e] flex flex-col justify-center items-center p-8 rounded-2xl space-y-5">
                    <div className="image">
                        <QuestionCircleOutlined style={{fontSize: "56px", color: "#fff"}} />
                    </div>
                    <div className="description text-center text-xl">
                        <p className="text-white">Извините, данная страница недоступна</p>
                    </div>
                    <div className="buttons p-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-center transition all duration-200">
                        <a href="/" className="text-white">Вернуться домой</a>
                    </div>
                </div>
            </div>
        </>
    )
}