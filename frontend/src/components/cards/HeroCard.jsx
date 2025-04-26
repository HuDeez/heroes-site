import {useNavigate} from "react-router-dom";

export default function HeroCard({ heroesData }) {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/heroes/${heroesData.id}`, { state: { heroesData } });
    }

    return (
        <>
            <div
                className="content-box flex flex-col gap-3 bg-[#181a1e] p-6 rounded-2xl items-center "
                onClick={handleClick}
            >
                <div className="photo h-[300px] sm:h-[400px] overflow-hidden">
                    <img
                        src={`/static/${heroesData.id}.png?v=${heroesData.timestamp}`}
                        onError={(e) => e.target.src = `/unknown_soldier.jpg`}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-2xl"/>
                </div>
                <div className="names p-2">
                    <div className="name">
                        <p className="text-3xl font-bold text-center">{heroesData.name}</p>
                    </div>
                    <div className="surname">
                        <p className="text-3xl font-bold text-center">{heroesData.surname}</p>
                    </div>
                </div>

                <div className="description p-4 bg-[#131417] whitespace-pre-line break-words rounded-2xl flex-1">
                    <p className="text-base text-left line-clamp-4 lg:line-clamp-none">{heroesData.card_description}</p>
                </div>

            </div>
        </>
    )
}