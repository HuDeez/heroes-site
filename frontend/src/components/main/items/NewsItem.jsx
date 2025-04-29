import { useOutletContext, useLocation } from "react-router-dom"
import {useEffect} from "react";

export default function NewsItem() {
    const location = useLocation();
    const newsData = location.state?.newsData;
    const [isMobile] = useOutletContext();
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

    return (
        <>
            {
                isMobile ?
                <MobileNewsItem newsData={newsData}/>
                :
                <DesktopNewsItem newsData={newsData}/>
            }
        </>
    )

};


function DesktopNewsItem({ newsData }) {
    return (
        <>
            <div className="head p-6 w-full"> 
                <div className="head-box bg-[#181a1e] flex flex-col lg:flex-row sm:gap-6 xl:gap-10 items-center justify-around p-6 rounded-3xl">

                    <div className="image h-[350px] xl:h-[450px] overflow-hidden flex-shrink-0">
                        <img 
                        src={newsData.image_url ? newsData.image_url : '/default.jpg'}
                        alt="article image" 
                        className="rounded-3xl object-cover w-full h-full"
                        />
                    </div>

                    <div className="content flex flex-col gap-6 w-[600px]">

                        <div className="title text-balance hyphens-auto tracking-[0px] text-center lg:text-left">
                            <h1 className={`w-full text-2xl xl:text-4xl`}>{newsData.title}</h1>
                        </div>

                        <div className="subtitle text-pretty hyphens-auto tracking-[-1px] text-center lg:text-left">
                            <p className={`text-base xl:text-2xl`}>{newsData.description}</p>
                        </div>

                        <div className="time p-4 bg-[#131417] rounded-2xl text-center">

                            <div className="published">
                                <p>Опубликовано: {newsData.datetime}</p>
                            </div>

                            <div className="reading">
                                <p>Время на чтение: {newsData.reading_time === 0 ? '<1 минуты' : `${newsData.reading_time} минута(ы)`}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {
                newsData.content &&
                <div className="box-content p-6 flex flex-col items-center gap-6">

                    <div className="head">
                        <h1>Информация</h1>
                    </div>

                    <div className="content p-4 bg-[#181a1e] rounded-2xl w-full">
                        <p className="text-[21px] text-balance text-justify leading-10">{newsData.content}</p>
                    </div>

                </div>
                
            }
        </>
    )
};


function MobileNewsItem({newsData}) {
    return (
        <>
            <div className="head p-6">
                <div className="head-box flex flex-col items-center p-4 bg-[#181a1e] rounded-2xl gap-4">
                    <div className="image">
                        <img 
                        src={newsData.image_url ? newsData.image_url : '/default.jpg'}
                        alt="article image" 
                        className="rounded-3xl object-cover w-full h-full"
                        />
                    </div>
                    <div className="header text-balance break-words text-center hyphens-auto tracking-[1px]">
                        <h1 className="w-full text-2xl sm:text-3xl">{newsData.title}</h1>
                    </div>
                    <div className="trait bg-[#131417] p-4 rounded-2xl w-full">
                        <p className="text-xl text-center">{newsData.description}</p>
                    </div>
                </div>
            </div>
            {
                newsData.content &&
                <div className="content">
                    <div className="content-box flex flex-col gap-6 items-center">
                        <div className="header">
                            <h1>Информация</h1>
                        </div>

                        <div className="body-content p-6">
                            <div className="body-box p-4 bg-[#181a1e] hyphens-auto rounded-2xl text-xl text-left text-balance wrap-break-word tracking-[-1px] w-full sm:text-2xl leading-[50px]">
                                <p className="w-full">{newsData.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};