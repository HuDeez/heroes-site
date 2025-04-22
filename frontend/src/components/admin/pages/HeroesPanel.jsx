import {useEffect, useState} from "react";
import apiClient from "../api/client.jsx";
import HeroPanelCard from "../components/HeroPanelCard.jsx";
import LoadingCard from "../../cards/LoadingCard.jsx";

export default function HeroesPanel() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [heroes, setHeroes] = useState([]);
    const [isModal, setIsModal] = useState(false)
    const [credentials, setCredentials] = useState(
        {
            'name': '',
            'surname': '',
            'card_description': '',
            'description': '',
            'image': ''
        }
    )

    const fetchHeroes = async () => {
        try {
            const response = await apiClient.get("/heroes/get_heroes");
            setHeroes(response.data);
            setLoading(false)
        } catch (err) {
            setError(err)
            console.log(err);
        }
    }

    const addHero = async () => {
        try {
            const response = await apiClient.post(
                "/heroes/create_hero",
                credentials
            )
            if (response.data['success']) {
                alert('Успешно')
            }
        } catch (err) {
            console.error(err)
        } finally {
            await fetchHeroes()
            close()
        }
    }

    const open = () => {
        setIsModal(true)
    }
    const close = () => {
        setIsModal(false)
    }

    const modalWindow = () => {
        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-12 overflow-hidden">
                <div className="card-body bg-[#E9EBF6] w-full p-3 rounded-2xl flex flex-col gap-4">
                    <div className="head p-3 bg-[#D6D4F6] rounded-3xl w-full">
                        <h1 className="text-black text-center">Добавление нового героя</h1>
                    </div>
                    <div className="body p-2 w-full bg-[#D6D4F6] rounded-3xl">
                        <div className="content-box flex flex-row w-full p-2">
                            <div className="head w-1/2 p-2">
                                <p className="text-black">Параметры</p>
                            </div>
                            <div className="parameters w-full">
                                <form method="post" className="p-6 flex flex-col gap-3 text-black"
                                      id="update-admin">
                                    <div className="name text-inherit">
                                        <label htmlFor="name" className="text-inherit">Имя: </label>
                                        <input
                                            className="p-2 rounded-xl text-black w-full text-base"
                                            type="text"
                                            name="name"
                                            id="name"
                                            onChange={(e) => setCredentials({
                                                ...credentials,
                                                name: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="surname text-inherit">
                                        <label htmlFor="surname" className="text-inherit">Фамилия: </label>
                                        <input
                                            className="p-2 rounded-xl text-black w-full text-base"
                                            type="text"
                                            name="surname"
                                            id="surname"
                                            onChange={(e) => setCredentials({
                                                ...credentials,
                                                surname: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="card_description text-inherit">
                                        <label htmlFor="description" className="text-inherit">Описание карточки: </label>
                                        <textarea
                                            className="p-2 rounded-xl text-black w-full text-base max-h-[100px]"
                                            name="card_description"
                                            id="card_description"
                                            rows="10"
                                            onChange={(e) => setCredentials({
                                                ...credentials,
                                                card_description: e.target.value
                                            })}
                                        ></textarea>
                                    </div>
                                    <div className="description text-inherit">
                                        <label htmlFor="description" className="text-inherit">Описание: </label>
                                        <textarea
                                            className="p-2 rounded-xl text-black w-full text-base size-full min-h-[300px]"
                                            name="description"
                                            id="description"
                                            rows="10"
                                            onChange={(e) => setCredentials({
                                                ...credentials,
                                                description: e.target.value
                                            })}
                                        ></textarea>
                                    </div>
                                    <div className="avatar col-span-full flex flex-col items-center">
                                        <label>
                                            <input
                                                type="file"
                                                hidden
                                                onChange={(e) => {
                                                    const file = e.target.files[0]; // Берем первый загруженный файл
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            // Когда файл прочитан, сохраняем Base64-строку в credentials
                                                            setCredentials({...credentials, image: reader.result});
                                                        };
                                                        reader.readAsDataURL(file); // Читаем файл как Data URL (Base64)
                                                    }
                                                }}
                                            />
                                            <div
                                                className="flex p-4 w-full flex-col bg-[#B9B6FF] rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none"
                                            >
                                                Выбрать аватар
                                            </div>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="footer">
                        <div className="buttons">
                            <div className="buttons flex flex-row gap-2 w-full">
                                <button
                                    className="p-3 bg-[#D6D4F6] hover:bg-[#B9B6FF] cursor-pointer transition-all text-black rounded-2xl w-full"
                                    onClick={close}
                                >
                                    Отменить
                                </button>

                                <button
                                    className="p-3 bg-[#D6D4F6] hover:bg-[#B9B6FF] cursor-pointer transition-all text-black rounded-2xl w-full"
                                    onClick={addHero}
                                >
                                    Подтвердить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const heroesList = () => {
        return (
            <>
                <div className="admins-list p-6 text-center content-center">
                    <h1 className="text-black">Список героев</h1>
                    <div className="heroes grid grid-cols-4 gap-4 p-4">
                        {heroes.map((hero) => (
                            <HeroPanelCard
                                dates={hero}
                                key={hero.id}
                                fetch={fetchHeroes}
                            />
                        ))}
                    </div>
                </div>
                <div className="footer w-full p-4">
                    <div
                        className="footer-box p-4 flex flex-col items-start justify-start gap-3 bg-[#E9EBF6] rounded-3xl w-1/2">
                        <div className="head w-full">
                            <h1 className="text-black">Статистика</h1>
                        </div>
                        <div className="body flex flex-row justify-between w-full">
                            <div className="quantity p-3 bg-[#D6D4F6] rounded-2xl content-center">
                                <p className="text-black">Общее количество: {heroes.length}</p>
                            </div>
                            <div className="buttons p-3">
                                <button
                                    className="p-3 bg-[#D6D4F6] hover:bg-[#B9B6FF] cursor-pointer transition-all text-black rounded-2xl w-full"
                                    onClick={open}
                                >
                                    Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        fetchHeroes();
    }, [])

    return (
        <div className="w-full h-full content-center p-8">
            <div className="content-wrapper flex flex-col justify-between bg-[#FAFAFA] h-full rounded-2xl">
                {loading && <LoadingCard />}
                {error ? <h1 className="text-black">Произошла непредвиденная ошибка</h1> : !loading && heroesList()}
            </div>

            {isModal && modalWindow()}
        </div>
    );
}

