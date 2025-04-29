import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext.jsx";
import apiClient from "../api/client.jsx";
import AdminCard from "../components/AdminCard.jsx";


export default function Dashboard() {
    const { user, logout, isMobile } = useContext(AuthContext);
    const [ admins, setAdmins ] = useState([]);
    const [ isModal, setIsModal ] = useState(false)
    const [ credentials, setCredentials ] = useState(
        {
            'username': '',
            'password': '',
            'first_name': '',
            'last_name': '',
            'rank': '',
            'access': 0,
            'image': ''
        }
    )

    const fetchAdmins = async () => {
        try {
            const response = await apiClient.get("/admins/get_admins");
            setAdmins(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const addAdmin = async () => {
        try {
            const response = await apiClient.post(
                "/admins/create_admin",
                credentials
            )
            if (response.data['success']) {
                alert('Успешно')
            }
        } catch (err) {
            console.error(err)
        } finally {
            await fetchAdmins()
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
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-2 overflow-hidden">
                <div className="card-body bg-[#E9EBF6] w-[500px] p-3 rounded-2xl flex flex-col gap-4">
                    <div className="head p-2 bg-[#D6D4F6] rounded-3xl w-full">
                        <h1 className="text-black text-center max-md:text-xl">Добавление нового профиля</h1>
                    </div>
                    <div className="body p-2 w-full bg-[#D6D4F6] rounded-3xl">
                        <div className="content-box flex flex-row max-md:flex-col w-full p-2">
                            <div className="head w-1/2 p-2 max-md:w-full max-md:text-center">
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
                                            onChange={(e) => setCredentials({
                                                ...credentials,
                                                access: e.target.value
                                            })}
                                        />
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
                                                className="flex p-4 max-md:w-full max-md:text-center flex-col bg-[#B9B6FF] rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none"
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
                                    onClick={addAdmin}
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

    useEffect(() => {
        fetchAdmins();
    }, [])

    return (
        <>
            {
                isMobile ?
                    <MobileDashboard
                        isModal={isModal}
                        modalWindow={modalWindow}
                        fetchAdmins={fetchAdmins}
                        admins={admins}
                        user={user}
                        logout={logout}
                        open={open}
                    />
                    :
                    <DesktopDashboard
                        isModal={isModal}
                        modalWindow={modalWindow}
                        fetchAdmins={fetchAdmins}
                        admins={admins}
                        user={user}
                        logout={logout}
                        open={open}
                    />
            }
        </>
    );

};

function DesktopDashboard({isModal, modalWindow, fetchAdmins, admins, user, logout, open}) {
    return (
        <>
            <div className="w-full h-full content-center p-8">
                <div className="content-wrapper flex flex-col justify-between bg-[#FAFAFA] h-full rounded-2xl p-4">
                    <div className="admins-list text-center content-center flex flex-col gap-4">
                        <div className="header">
                            <h1 className="text-black">Список администраторов</h1>
                        </div>
                        <div
                            className="admins grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 w-full">
                            {admins.map((admin) => (
                                <AdminCard
                                    dates={admin}
                                    key={admin.username}
                                    currentUser={user} fetch={async () => fetchAdmins()}
                                    logout={logout}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="footer w-full p-4">
                        <div
                            className="footer-box p-4 flex flex-col items-start justify-start gap-3 bg-[#E9EBF6] rounded-3xl w-1/2 max-lg:w-full">
                            <div className="head w-full text-center">
                                <h1 className="text-black">Статистика</h1>
                            </div>
                            <div className="body flex flex-col gap-4 items-center w-full max-lg:w-full ">
                                <div className="quantity p-2 bg-[#D6D4F6] rounded-2xl w-full flex flex-col gap-2">
                                    <p className="text-black">Общее количество: {admins.length}</p>
                                    <p className="text-black">Количество администраторов: {admins.filter((admin) => {
                                        return admin.access === 1
                                    }).length}</p>
                                    <p className="text-black">Количество редакторов: {admins.filter((admin) => {
                                        return admin.access === 0
                                    }).length}</p>
                                </div>
                                {
                                    user?.access >= 1 && <div className="buttons w-full">
                                        <button
                                            className="p-3 bg-[#D6D4F6] hover:bg-[#B9B6FF] cursor-pointer transition-all text-black rounded-2xl w-full"
                                            onClick={open}
                                        >
                                            Добавить
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {isModal && modalWindow()}
            </div>
        </>
    )
}

function MobileDashboard({isModal, modalWindow, fetchAdmins, admins, user, logout, open}) {
    return (
        <>
            <div className="p-4">
                <div className="content-box bg-[#fff] rounded-2xl flex flex-col gap-4">
                    <div className="admins-list flex flex-col gap-4 items-center">
                        <div className="header p-3">
                            <h1 className="text-black text-2xl text-center">Список администраторов</h1>
                        </div>

                        <div className="admins grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full">
                            {admins.map((admin) => (
                                <AdminCard
                                    dates={admin}
                                    key={admin.username}
                                    currentUser={user} fetch={async () => fetchAdmins()}
                                    logout={logout}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="footer w-full p-4">
                        <div
                            className="footer-box p-4 bg-[#E9EBF6] rounded-3xl flex flex-col items-center gap-4">
                            <div className="head w-full text-center">
                                <h1 className="text-black text-xl">Статистика</h1>
                            </div>
                            <div className="body flex flex-col justify-between w-full gap-4">
                                <div className="quantity p-2 bg-[#D6D4F6] rounded-2xl w-full flex flex-col gap-2">
                                    <p className="text-black">Общее количество: {admins.length}</p>
                                    <p className="text-black">Количество администраторов: {admins.filter((admin) => {
                                        return admin.access === 1
                                    }).length}</p>
                                    <p className="text-black">Количество редакторов: {admins.filter((admin) => {
                                        return admin.access === 0
                                    }).length}</p>
                                </div>
                                {
                                    user?.access >= 1 && <div className="buttons w-full">
                                        <button
                                            className="p-3 bg-[#D6D4F6] hover:bg-[#B9B6FF] cursor-pointer transition-all text-black rounded-2xl w-full"
                                            onClick={open}
                                        >
                                            Добавить
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {isModal && modalWindow()}
            </div>
        </>
    )
}
