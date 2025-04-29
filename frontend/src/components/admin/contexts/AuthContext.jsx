import { createContext, useEffect, useState } from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import apiClient from "../api/client.jsx";
import useDeviceDetect from "../../utils/DeviceDetect.jsx";

export const AuthContext = createContext({});


export const checkAuth = async () => {
    try {
        const response = await apiClient.get(
            "/sessions/whoami",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            }
        )
        return response.data;
    } catch {
        return null
    }
}


export default function AuthProvider() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isMobile } = useDeviceDetect()

    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = async () => {
        const data = await checkAuth(apiClient);
        setUser(data);
    };

    const login = async (username, password) => {
        setLoading(true);
        const formData = new URLSearchParams({'username': username, 'password': password});

        try {
            await apiClient.post(
                "/sessions/create_session",
                formData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true,
                }
            )

            await initializeAuth();

            setTimeout(() => {
                navigate('/admin/dashboard');
                setLoading(false);
            }, 1000)
        } catch (error){
            setLoading(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await apiClient.post(
                '/sessions/delete_session',
                null,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.error(error);
        } finally {
            setUser(null);
            navigate('/login')
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isMobile}}>
            <Outlet />
        </AuthContext.Provider>
    );
}