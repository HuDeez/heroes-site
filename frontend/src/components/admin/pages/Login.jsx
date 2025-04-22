import {useContext, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import {AuthContext} from "../contexts/AuthContext.jsx";
import {Navigate} from "react-router-dom";



export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, login, loading } = useContext(AuthContext);


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


    const validateCredentials = async (value, type) => {
        if (type === 'username') {
            if (value === '') {
                document.querySelector("#username-error").classList.remove('hidden')
            } else {
                document.querySelector("#username-error").classList.add('hidden')
            }
        } else {
            if (value === '') {
                document.querySelector("#password-error").classList.remove('hidden')
            } else {
                document.querySelector("#password-error").classList.add('hidden')
            }
        }
    }

    if (user === null) {
        return (
            <div className="bg-[#d9defc] min-h-[100vh] content-center text-center">
                <div className="bg-[#f9f9ff] p-8 inline-block rounded-2xl">
                    <div className="content flex flex-col gap-8 w-full">
                        <div className="head">
                            <h1 className="text-black">Log-In</h1>
                        </div>
                        <div className="form-input">
                            <form action="" method="post" className="flex flex-col gap-4 p-4 w-[400px]" id="user-form">
                                <div className="username">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Введите свой логин"
                                        className="p-4 bg-[#e4e4fa] w-full text-black rounded-2xl hover:bg-[#d0d0fc] transition-all"
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            validateCredentials(e.target.value, 'username')
                                        }}
                                        required
                                    />
                                    <p id="username-error" className="text-red-400 p-2 hidden">Username не может быть
                                        пустым</p>
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
                                            validateCredentials(e.target.value, 'password')
                                        }}
                                        required
                                    />
                                    <p id="password-error" className="text-red-400 p-2 hidden">Пароль не может быть
                                        пустым</p>
                                </div>
                            </form>
                        </div>
                        <div className="buttons">
                            <button
                                type="button"
                                className="bg-[#aaaafd] p-4 w-1/2 rounded-2xl cursor-pointer hover:bg-[#8a8af8] transition-all"
                                onClick={handleSubmit}
                            >
                                {loading ?
                                    <Spin className="overflow-hidden" indicator={<LoadingOutlined spin/>}/> : 'Войти'}
                            </button>
                        </div>
                        {error && <p className="text-red-400">Произошла ошибка: {error}</p>}
                    </div>
                </div>
            </div>
        )
    } else {
        return <Navigate to="/admin/dashboard" />
    }
}