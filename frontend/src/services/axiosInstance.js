import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_AUTOS_ENDPOINT,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

// 👉 Agrega el token a todos los requests
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 👉 Si el token está vencido o inválido lo borra
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default instance;
