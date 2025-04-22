import {useState} from "react";
import apiClient from "../api/client.jsx";

function AdminCard({ dates, currentUser, fetch, logout}) {
    const [ type, setType ] = useState(null);
    const [ isModal, setIsModal ] = useState(false);
    const [ credentials, setCredentials ] = useState(
        {
            'username': dates.username,
            'password': null,
            'first_name': dates.first_name,
            'last_name': dates.last_name,
            'rank': dates.rank,
            'access': dates.access,
            'image': dates.image
        }
    )


    const close = () => {
        setType(null);
        setIsModal(false);
    }


    const updateAdmin = async () => {
        try {
            const username = dates.username
            const response = await apiClient.put(
                `/admins/update_admin/${username}`,
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

    const deleteAdmin = async () => {
        try {
            const username = dates.username
            const response = await apiClient.delete(`/admins/delete_admin/${username}`)
            if (response.data['success']) {
                await fetch()
                alert('Успешно')
            }
            if (username === currentUser.username) {
                await logout()
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-12 overflow-hidden">
                    <div className="card-body bg-[#E9EBF6] w-[500px] p-3 rounded-2xl flex flex-col gap-4">
                        <div className="head flex flex-row items-center justify-center p-2 bg-[#D6D4F6] rounded-3xl gap-4">
                            <div className="avatar">
                                <img
                                    src={dates.image.startsWith('data:image') ? `${dates.image}` : '/avatar.png'}
                                    alt="avatar"
                                    className="w-[70px] h-[70px] rounded-full"/>
                            </div>
                            <div
                                className="info p-3 rounded-2xl flex flex-row items-center gap-4">
                                <div className="names text-left p-2 rounded-2xl flex flex-col gap-1">
                                    <p className={`text-black font-bold`}>{dates.first_name}</p>
                                    <p className={`text-black font-bold`}>{dates.last_name}</p>
                                </div>
                                <div className="rank text-center">
                                    <p className={`text-black font-bold`}>{dates.rank}</p>
                                </div>
                            </div>

                        </div>

                        <div className="body p-2 w-full bg-[#D6D4F6] rounded-3xl">
                            <div className="content-box flex flex-row w-full p-2">
                                <div className="head w-1/2 p-2">
                                    <p className="text-black">Параметры</p>
                                </div>
                                <div className="parameters w-full">
                                    <form method="post" className="p-6 flex flex-col gap-3 text-black"
                                          id="update-admin">
                                        <div className="username text-inherit">
                                            <label htmlFor="name" className="text-inherit">Username: </label>
                                            <input
                                                className="p-2 rounded-xl text-black w-full text-base"
                                                type="text"
                                                name="username"
                                                id="username"
                                                value={credentials?.username}
                                                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    username: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="password text-inherit">
                                            <label htmlFor="name" className="text-inherit">Пароль: </label>
                                            <input
                                                className="p-2 rounded-xl text-black w-full text-base"
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={credentials?.password}
                                                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    password: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="name text-inherit">
                                            <label htmlFor="name" className="text-inherit">Имя: </label>
                                            <input
                                                className="p-2 rounded-xl text-black w-full text-base"
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={credentials?.first_name}
                                                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    first_name: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="surname text-inherit">
                                            <label htmlFor="name" className="text-inherit">Фамилия: </label>
                                            <input
                                                className="p-2 rounded-xl text-black w-full text-base"
                                                type="text"
                                                name="surname"
                                                id="surname"
                                                value={credentials?.last_name}
                                                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    last_name: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="rank text-inherit">
                                            <label htmlFor="rank" className="text-inherit">Должность: </label>
                                            <input
                                                className="p-2 rounded-xl text-black w-full text-base"
                                                type="text"
                                                name="rank"
                                                id="rank"
                                                value={credentials?.rank}
                                                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    rank: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="access text-inherit">
                                            <label htmlFor="name" className="text-inherit">Уровень доступа: </label>
                                            <input
                                                className="p-2 rounded-xl text-black w-full text-base"
                                                type="text"
                                                name="access"
                                                id="access"
                                                value={credentials?.access}
                                                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    access: e.target.value
                                                })}
                                            />
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
                                        onClick={updateAdmin}
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-12 overflow-hidden">
                    <div className="card-body bg-[#E9EBF6] w-[500px] p-3 rounded-2xl flex flex-col gap-4">
                        <div
                            className="head flex flex-row items-center justify-center p-2 bg-[#D6D4F6] rounded-3xl gap-4">
                            <div className="avatar">
                                <img
                                    src={dates.image.startsWith('data:image') ? `${dates.image}` : '/avatar.png'}
                                    alt="avatar"
                                    className="w-[70px] h-[70px] rounded-full"/>
                            </div>
                            <div
                                className="info p-3 rounded-2xl flex flex-row items-center gap-4">
                                <div className="names text-left p-2 rounded-2xl flex flex-col gap-1">
                                    <p className={`text-black font-bold`}>{dates.first_name}</p>
                                    <p className={`text-black font-bold`}>{dates.last_name}</p>
                                </div>
                                <div className="rank text-center">
                                    <p className={`text-black font-bold`}>{dates.rank}</p>
                                </div>
                            </div>

                        </div>
                        <div className="body">
                            <div className="content-box flex flex-col gap-3">
                                <div className="header">
                                    <p className="text-black">Вы точно хотите удалить данный профиль?</p>
                                </div>
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
                                            onClick={deleteAdmin}
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
            <div className="header flex flex-row w-full gap-2 justify-between items-center">
                <div
                    className="rank bg-[#B9B6FF] rounded-2xl p-3 inline-block">
                    <p className={`text-black w-full`}>{dates.rank}</p>
                </div>
                {
                    dates?.username === currentUser.username &&
                    <div className="p-3 rounded-2xl bg-[#B9B6FF]">
                        <p className="text-black">
                            Это вы
                        </p>
                    </div>
                }
            </div>
            <div className="content-box p-2 flex flex-row items-center gap-1 bg-[#D6D4F6] rounded-2xl w-full">
                <div className="head">
                    <div className="avatar">
                        <img
                            src={dates.image.startsWith('data:image') ? `${dates.image}` : '/avatar.png'}
                            alt="avatar"
                            className="w-[70px] h-[70px] rounded-full"/>
                    </div>
                </div>
                <div className="body">
                    <div
                        className="info p-2 rounded-2xl flex flex-col items-start w-full">
                        <div className="names text-left p-2 rounded-2xl">
                            <p className={`text-black`}>{dates.first_name}</p>
                            <p className={`text-black`}>{dates.last_name}</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                    currentUser.access === 2 && <div className="footer w-full">
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

export default AdminCard;