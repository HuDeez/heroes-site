import { useOutletContext } from "react-router-dom"

export default function ErrorCard() {
    const [isMobile] = useOutletContext();
    return (
        <>
            {
                isMobile ?
                <MobileErrorCard />
                :
                <DesktopErrorCard />
            }
        </>
    )
}

function DesktopErrorCard() {
    return (
        <>
            <div className="flex p-16 justify-center">
                <div className="bg-[#181a1e] flex flex-col justify-center items-center p-8 rounded-2xl space-y-5">
                    <div className="title">
                        <h1 className="text-2xl">Произошла непредвиденная ошибка</h1>
                    </div>
                    <div className="image">
                        <i className='bx bx-error-circle text-9xl text-blue-600'></i>
                    </div>
                    <div className="description text-balance text-center whitespace-pre-line break-words text-xl">
                        <p>Содержимое страницы временно недоступно</p>
                    </div>
                </div>
            </div>
        </>
    )
}


function MobileErrorCard() {
    return (
        <>
            <div className="flex p-16 justify-center">
                <div className="bg-[#181a1e] flex flex-col justify-center items-center p-8 rounded-2xl space-y-5 w-full">
                    <div className="title text-center w-full">
                        <h1 className="text-2xl">Произошла непредвиденная ошибка</h1>
                    </div>  
                    <div className="image">
                        <i className='bx bx-error-circle text-9xl text-blue-600'></i>
                    </div>
                    <div className="description text-balance text-center whitespace-pre-line break-words text-base">
                        <p>Содержимое страницы временно недоступно</p>
                    </div>
                </div>
            </div>
        </>
    )
}