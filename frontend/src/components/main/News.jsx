import {useEffect, useState} from "react";
import ErrorCard from "../cards/ErrorCard.jsx";
import LoadingCard from "../cards/LoadingCard.jsx";
import NewsCard from "../cards/NewsCard.jsx";
import apiClient from "../admin/api/client.jsx";
import {useOutletContext} from "react-router-dom";

export default function News() {

    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile] = useOutletContext()

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get("news/")
            setNews(response.data)
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [])


    return (
        <>
            {loading && <LoadingCard />}
            {error ? <ErrorCard /> : !loading && <NewsBlock news={news} isMobile={isMobile}/>}
        </>
    )
}

function NewsBlock({news, isMobile}) {
    return (
        <>
            <div className="title content-center">
                <h1 className="text-3xl sm:text-5xl text-center p-12">Новости за последние сутки</h1>
            </div>
            {isMobile ?
                <MobileNews news={news}/>
                :
                <DesktopNews news={news}/>
            }
        </>
    )
}

function DesktopNews({news}) {
    return (
        <div className="list grid xl:grid-cols-4 gap-12 md:grid-cols-2 p-5">
            {news.map((newsObject) => (
                    <NewsCard newsData={newsObject} key={parseInt(newsObject.article_id)}/>
                ))
            }
        </div>
    )
}

function MobileNews({news}) {
    return (
        <div className={`flex flex-col gap-10 p-5`}>
            {
                news.map((newsObject) => (
                    <NewsCard newsData={newsObject} key={parseInt(newsObject.article_id)}/>
                ))
            }
        </div>
    )
}