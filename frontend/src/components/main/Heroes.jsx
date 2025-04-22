import {useEffect, useState} from "react";
import apiClient from "../admin/api/client.jsx";
import LoadingCard from "../cards/LoadingCard.jsx";
import ErrorCard from "../cards/ErrorCard.jsx";
import HeroCard from "../cards/HeroCard.jsx";
import {useOutletContext} from "react-router-dom";

export default function Heroes() {
    const [heroes, setHeroes] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile] = useOutletContext()

    const fetchHeroes = async () => {
        try {
            const response = await apiClient.get("/heroes/get_heroes")
            setHeroes(response.data)
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchHeroes();
    }, [])

    return (
        <div className="news p-12 flex flex-col space-y-6 w-full">
            {loading && <LoadingCard />}
            {error ? <ErrorCard /> : !loading && <HeroesBlock isMobile={isMobile} heroes={heroes}/>}
        </div>
    )
}

function HeroesBlock({ isMobile, heroes }) {
    return (
        <>
            <div className="title content-center">
                <h1 className="text-4xl sm:text-5xl text-center p-12">Наши герои</h1>
            </div>
            {isMobile ?
                <MobileHeroes heroes={heroes}/>
                :
                <DesktopHeroes heroes={heroes}/>
            }
        </>
    )
}

function DesktopHeroes({heroes}) {
    return (
        <div className="list grid 2xl:grid-cols-4 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {heroes.map((hero) => (
                <HeroCard key={hero.id} heroesData={hero}/>
            ))}
        </div>
    )
}

function MobileHeroes({heroes}) {
    return (
        <div className={`flex flex-col gap-10 p-2`}>
            {
                heroes.map((hero) => (
                    <HeroCard key={hero.id} heroesData={hero}/>
                ))
            }
        </div>
    )
}

