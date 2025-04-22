import { useNavigate } from "react-router-dom";


export default function NewsCard( { newsData } ) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/news/${newsData.article_id}`, { state: { newsData } });
    }


    return (
        <>
            <div
                className="flex flex-col items-center space-y-6 p-4 bg-[#181a1e] rounded-2xl max-h-full transition duration-200 hover:bg-[#212428] cursor-pointer"
                onClick={handleClick}
            >

                <div className="flex flex-col space-y-6">
                    <div className="h-[200px] overflow-hidden">
                        <img
                            src={newsData.image_url ? newsData.image_url : '/default.jpg'}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-2xl text-center"/>
                    </div>

                    <span className="text-center h-28 overflow-hidden">
                        <h1 className="text-xl font-bold">{newsData.title}</h1>
                    </span>
                </div>

                <div className="flex flex-1 flex-col space-y-6 w-full justify-between items-center">
                    <span className="line-clamp-3 bg-[#131417] w-full p-4 rounded-xl">
                        <p className="line-clamp-3">{newsData.description}</p>
                    </span>

                    <span className="flex flex-col space-y-2 bg-[#131417] w-full p-4 rounded-xl">
                        <span>
                            <i className="bi bi-calendar3 flex flex-row gap-4">{newsData.datetime}</i>
                        </span>
                        <span>
                            <i className="bi bi-clock flex flex-row gap-4">{newsData.reading_time < 1 ? '<1' : newsData.reading_time} мин.</i>
                        </span>
                    </span>
                </div>
            </div>
        </>
    );
}
