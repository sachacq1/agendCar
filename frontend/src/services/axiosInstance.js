import axios from "axios";


const instance = axios.create({
    baseURL: import.meta.env.VITE_AUTOS_ENDPOINT,
    withCredentials: true
});


instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default instance;
