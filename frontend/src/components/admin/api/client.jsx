import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api/v1',
    timeout: 10000,
    withCredentials: true
});


apiClient.interceptors.response.use(
    response => response,
    error => {
        if ((error.response?.status === 401 || error.response.status === 403) && (window.location.pathname !== '/login')) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;