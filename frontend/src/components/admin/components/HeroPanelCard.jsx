import {useState} from "react";
import apiClient from "../api/client.jsx";

export default function HeroPanelCard({ dates, fetch }) {
    const [ type, setType ] = useState(null);
    const [ isModal, setIsModal ] = useState(false);
    const [ credentials, setCredentials ] = useState(
        {
            'id': dates.id,
            'name': dates.name,
            'surname': dates.surname,
            'card_description': dates.card_description,
            'description': dates.description,
            'image': '',
        }
    )

    const close = () => {
        setType(null);
        setIsModal(false);
    }


    const updateHero = async () => {
        try {
            const hero_id = dates.id;
            const response = await apiClient.put(
                `/heroes/update_hero/${hero_id}`,
                credentials
            )
            if (response.data['success']) {
                await fetch()
                alert('Успешно')
            }
        } catch (err) {
            console.log(err)
        } finally {
            close()
        }
    }

    const deleteHero = async () => {
        try {
            const hero_id = dates.id;
            const response = await apiClient.delete(`/heroes/delete_hero/${hero_id}`)
            if (response.data['success']) {
                await fetch()
                alert('Успешно')
            }
        } catch (err) {
            console.log(err)
        } finally {
            close()
        }
    }

    const modalWindow = () => {
        if (type === 'edit') {
            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-2 2xl:p-12 overflow-hidden">
                    <div className="card-body bg-[#E9EBF6] p-3 rounded-2xl flex flex-col gap-4 w-full">
                        <div className="head flex flex-row items-center justify-center p-2 bg-[#D6D4F6] rounded-3xl gap-4">
                            <div className="avatar">
                                <img
                                    src={`/static/${credentials.id}.png`}
                                    onError={(e) => e.target.src = '/avatar.png'}
                                    alt="avatar"
                                    className="w-[70px] h-[70px] rounded-full"/>
                            </div>
                            <div
                                className="info p-3 rounded-2xl flex flex-row items-center gap-4">
                                <div className="names text-left p-2 rounded-2xl flex flex-col gap-1">
                                    <p className={`text-black font-bold`}>{dates.name}</p>
                                    <p className={`text-black font-bold`}>{dates.surname}</p>
                                </div>
                            </div>

                        </div>

                        <div className="body p-2 w-full bg-[#D6D4F6] rounded-3xl">
                            <div className="content-box flex flex-row max-md:flex-col w-full p-2">
                                <div className="head w-1/2 p-2 max-md:w-full">
                                    <p className="text-black text-left max-md:text-center">Параметры</p>
                                </div>
                                <div className="parameters w-full">
                                    <form method="post" className="flex flex-col gap-6 text-black"
                                          id="update-admin">
                                        <div className="name text-inherit">
                                            <label htmlFor="name" className="text-inherit">Имя: </label>
                                            <input
                                                className="p-2 rounded-xl text-black w-full text-base"
                                                type="text"
                                                name="username"
                                                id="username"
                                                value={credentials?.name}
                                                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    name: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="name text-inherit">
                                            <label htmlFor="surname" className="text-inherit">Фамилия: </label>
                                            <input
                                                className="p-2 rounded-xl text-black w-full text-base"
                                                type="text"
                                                name="surname"
                                                id="surname"
                                                value={credentials?.surname}
                                                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    surname: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="card_description text-inherit overflow-auto">
                                            <label htmlFor="description" className="text-inherit">Описание карточки: </label>
                                            <textarea
                                                className="p-2 rounded-xl text-black w-full text-base max-md:max-h-[100px]"
                                                name="card_description"
                                                id="card_description"
                                                rows="10"
                                                value={credentials.card_description}
                                                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    card_description: e.target.value
                                                })}
                                            ></textarea>
                                        </div>
                                        <div className="description text-inherit">
                                            <label htmlFor="description" className="text-inherit">Описание: </label>
                                            <textarea
                                                className="p-2 rounded-xl text-black w-full text-base size-full max-md:max-h-[100px] overflow-auto"
                                                name="description"
                                                id="description"
                                                rows="10"
                                                value={credentials.description}
                                                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    description: e.target.value
                                                })}
                                            ></textarea>
                                        </div>
                                        <div className="avatar col-span-full flex flex-col items-center">
                                            <label className={`w-full`}>
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
                                        onClick={updateHero}
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-2 overflow-hidden">
                    <div className="card-body bg-[#E9EBF6] w-[500px] p-3 rounded-2xl flex flex-col gap-4">
                        <div
                            className="head flex flex-row items-center justify-center p-2 bg-[#D6D4F6] rounded-3xl gap-4">
                            <div className="avatar">
                                <img
                                    src={`/static/${dates.id}.png?v=${dates.timestamp}`}
                                    onError={(e) => e.target.src = '/avatar.png'}
                                    alt="avatar"
                                    className="w-[70px] h-[70px] rounded-full"/>
                            </div>
                            <div
                                className="info p-3 rounded-2xl flex flex-row items-center gap-4">
                                <div className="names text-left p-2 rounded-2xl flex flex-col gap-1">
                                    <p className={`text-black font-bold`}>{dates.name}</p>
                                    <p className={`text-black font-bold`}>{dates.surname}</p>
                                </div>
                            </div>

                        </div>
                        <div className="body">
                            <div className="content-box flex flex-col gap-3 items-center">
                                <div className="header">
                                    <p className="text-black text-base text-center">Вы точно хотите удалить данный профиль?</p>
                                </div>
                                <div className="buttons w-full">
                                    <div className="buttons flex flex-row gap-2 w-full">
                                        <button
                                            className="p-3 bg-[#D6D4F6] hover:bg-[#B9B6FF] cursor-pointer transition-all text-black rounded-2xl w-full"
                                            onClick={close}
                                        >
                                            Отменить
                                        </button>

                                        <button
                                            className="p-3 bg-[#D6D4F6] hover:bg-[#B9B6FF] cursor-pointer transition-all text-black rounded-2xl w-full"
                                            onClick={deleteHero}
                                        >
                                            Подтвердить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }


    return (
        <div className="bg-[#E9EBF6] rounded-2xl p-4 flex flex-col gap-4">
            <div className="content-box p-2 flex flex-row items-center gap-1 bg-[#D6D4F6] rounded-2xl w-full">
                <div className="head">
                    <div className="avatar">
                        <img
                            src={`/static/${credentials.id}.png`}
                            onError={(e) => e.target.src = '/avatar.png'}
                            alt="avatar"
                            className="w-[70px] h-[70px] rounded-full"/>
                    </div>
                </div>
                <div className="body">
                    <div
                        className="info p-2 rounded-2xl flex flex-col items-start w-full">
                        <div className="names text-left p-2 rounded-2xl">
                            <p className={`text-black`}>{dates.name}</p>
                            <p className={`text-black`}>{dates.surname}</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                    <div className="footer w-full">
                        <div className="buttons flex flex-row gap-2 w-full">
                            <button
                                className="p-3 bg-[#D6D4F6] hover:bg-[#B9B6FF] cursor-pointer transition-all text-black rounded-2xl w-full"
                                onClick={() => {
                                        setType('edit');
                                        setIsModal(true);
                                }}
                            >
                                Править
                            </button>

                            <button
                                className="p-3 bg-[#D6D4F6] hover:bg-[#B9B6FF] cursor-pointer transition-all text-black rounded-2xl w-full"
                                onClick={() => {
                                        setType('delete');
                                        setIsModal(true);
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
            }
            {isModal && modalWindow()}
        </div>

    )
}