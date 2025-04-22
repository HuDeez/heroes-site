import {useLocation, useOutletContext, Navigate} from "react-router-dom";
import {useEffect} from "react";

export default function Hero() {
    const location = useLocation();
    const heroesData = location.state?.heroesData;
    const [isMobile] = useOutletContext();

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);


    return (
        <>
            {
                !heroesData ? <Navigate to={`/404`} /> : 
                isMobile ?
                    <MobileHero heroesData={heroesData}/>
                    :
                    <DesktopHero heroesData={heroesData}/>
            }
        </>
    )


}



function DesktopHero({heroesData}) {
    return (
        <>
            <div className="head w-full h-full p-8">
                <div className="head-wrapper bg-[#181a1e] p-4 flex flex-col-reverse lg:flex-row justify-around rounded-3xl items-center lg:gap-0 gap-4" >
                    <div className="information flex flex-col gap-6 items-center">
                        <div className="name w-full text-center">
                            <h1 className="text-[50px] xl:text-[65px] p-1">{heroesData.name}</h1>
                            <h1 className="text-[50px] xl:text-[65px] p-1">{heroesData.surname}</h1>
                        </div>
                        <div className="trait bg-[#131417] p-4 rounded-2xl w-full">
                            <p className="w-[400px] text-[23px] hyphens-auto tracking-[-1px] text-justify text-pretty">{heroesData.card_description}</p>
                        </div>
                    </div>
                    <div className="photo h-[400px] overflow-hidden">
                    <img
                        src={`/static/${heroesData.id}.png?v=${heroesData.timestamp}`}
                        onError={(e) => e.target.src = '/unknown_soldier.jpg'}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-2xl"/>
                </div>
                </div>
            </div>
            <div className="content-box w-full items-center flex flex-col gap-4 p-10">
                <h1 className="text-6xl p-1">О герое</h1>
                <div className="bio p-4 bg-[#181a1e] rounded-2xl">
                    <p className="text-2xl p-1 tracking-wide leading-[55px] whitespace-pre-line text-pretty text-justify break-word">{heroesData.description}</p>
                </div>
            </div>
        </>
    )
}

function MobileHero({heroesData}) {
    return (
        <>
            <div className="head w-full h-full p-8">
                <div className="head-wrapper bg-[#181a1e] p-4 flex flex-col-reverse justify-around rounded-3xl items-center gap-6" >
                    <div className="information flex flex-col gap-6 items-center">
                        <div className="name w-full text-center">
                            <h1 className="text-[40px] p-1">{heroesData.name}</h1>
                            <h1 className="text-[40px] p-1">{heroesData.surname}</h1>
                        </div>
                        <div className="trait bg-[#131417] p-4 rounded-2xl w-full">
                            <p className="text-[23px] text-center">{heroesData.card_description}</p>
                        </div>
                    </div>
                    <div className="photo h-[400px] overflow-hidden">
                    <img
                        src={`/static/${heroesData.id}.png?v=${heroesData.timestamp}`}
                        onError={(e) => e.target.src = '/unknown_soldier.jpg'}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-2xl"/>
                </div>
                </div>
            </div>
            <div className="content-box w-full items-center flex flex-col gap-4 p-10">
                <h1 className="text-4xl p-1">О герое</h1>
                <div className="bio p-4 bg-[#181a1e] rounded-2xl w-full">
                    <p className="text-xl p-2 text-pretty hyphens-auto tracking-[-1px] leading-[50px] text-left whitespace-pre-line">{heroesData.description}</p>
                </div>
            </div>
        </>
    )
}
