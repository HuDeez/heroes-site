import {useContext, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {AuthContext} from "../contexts/AuthContext.jsx";
import {Navigate, useOutletContext} from "react-router-dom";



export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, login, loading, isMobile} = useContext(AuthContext);


    const handleSubmit = async () => {
        try {
            await login(username, password);
        } catch (err) {
            console.error(err);
            setErrorMessage(err);
        }
    };

    const setErrorMessage = (error) => {
        const status = {
            401: 'Неверные данные',
            403: 'Доступ запрещен'
        }
        const message = status[error.response.status];
        setError(message ? message : "Произошла непредвиденная ошибка");
    }

    if (user === null) {
        return (
            <div className="bg-[#d9defc] min-h-[100vh] text-center content-center">
                {
                    isMobile ?
                        <MobileLogin
                            loading={loading}
                            error={error}
                            setUsername={setUsername}
                            setPassword={setPassword}
                            handleSubmit={handleSubmit}/>
                        :
                        <DesktopLogin
                            loading={loading}
                            error={error}
                            setUsername={setUsername}
                            setPassword={setPassword}
                            handleSubmit={handleSubmit}/>
                }
            </div>
        )
    } else {
        return <Navigate to="/admin/dashboard" />
    }
}

function MobileLogin({loading, error, setUsername, setPassword, handleSubmit}) {
    return (
        <>
            <div className="p-4">
                <div className="content-box bg-[#f9f9ff] rounded-2xl p-8 flex flex-col gap-4">
                    <div className="header p-2">
                        <h1 className={`text-black font-extralight`}>Log-In</h1>
                    </div>
                    <div className="form-input flex flex-col gap-3">

                        <div className="username">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Введите свой логин"
                                className="p-4 bg-[#e4e4fa] w-full text-black rounded-2xl hover:bg-[#d0d0fc] transition-all"
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="password">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Введите свой пароль"
                                className="p-4 bg-[#e4e4fa] w-full text-black rounded-2xl hover:bg-[#d0d0fc] transition-all"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                    </div>
                    <div className="buttons">
                        <button
                            type="button"
                            className="bg-[#aaaafd] p-4 w-full rounded-2xl cursor-pointer hover:bg-[#8a8af8] transition-all"
                            onClick={handleSubmit}
                        >
                            {loading ?
                                <Spin className="overflow-hidden" indicator={<LoadingOutlined spin/>}/> : 'Войти'}
                        </button>
                    </div>
                    {error && <p className="text-red-400">Произошла ошибка: {error}</p>}
                </div>
            </div>
        </>
    )
}

function DesktopLogin({loading, error, setUsername, setPassword, handleSubmit}) {
    return (
        <>
            <div className="p-6 content-center inline-block">
                <div className="content-box bg-[#f9f9ff] rounded-2xl flex flex-col items-center gap-4 p-8 w-[600px]">
                    <div className="head">
                        <h1 className="text-black">Log-In</h1>
                    </div>
                    <div className="form-input flex flex-col gap-3 w-full">
                        <div className="username">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Введите свой логин"
                                className="p-4 bg-[#e4e4fa] w-full text-black rounded-2xl hover:bg-[#d0d0fc] transition-all"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="password">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Введите свой пароль"
                                className="p-4 bg-[#e4e4fa] w-full text-black rounded-2xl hover:bg-[#d0d0fc] transition-all"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="buttons w-full">
                        <button
                            type="button"
                            className="bg-[#aaaafd] p-4 w-full rounded-2xl cursor-pointer hover:bg-[#8a8af8] transition-all"
                            onClick={handleSubmit}
                        >
                            {loading ?
                                <Spin className="overflow-hidden" indicator={<LoadingOutlined spin/>}/> : 'Войти'}
                        </button>
                    </div>
                    {error && <p className="text-red-400">Произошла ошибка: {error}</p>}
                </div>
            </div>
        </>
    )
}
