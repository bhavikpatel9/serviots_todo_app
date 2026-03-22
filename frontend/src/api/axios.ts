import { dispatchClearUser } from '@/redux/dispatch/user.dispatch';
import axios, { type AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
})

axios.interceptors.response.use(
    (response) => {
        if (response.data?.statusCode === 401) {
            localStorage.removeItem('token');
            dispatchClearUser();
            toast.error(response.data.message);
        } else if (!response.data?.success) {
            toast.error(response.data.message, { autoClose: 2000 });
            return Promise.reject({
                response,
                message: response.data.message,
            });
        }

        return response;
    },
    (error) => {

        if (error.code === 'ERR_CANCELED') {
            return Promise.reject(error);
        }
        toast.error("Internal server error.", { autoClose: 2000 })
        return Promise.reject(error);
    }
);

export const getApi = <T>(url: string, config?: AxiosRequestConfig) =>
    axios.get<T>(url, config);

export const postApi = <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axios.post<T>(url, data, config);

export const putApi = <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axios.put<T>(url, data, config);

export const deleteApi = <T>(url: string, config?: AxiosRequestConfig) =>
    axios.delete<T>(url, config);
