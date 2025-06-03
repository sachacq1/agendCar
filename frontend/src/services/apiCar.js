import axios from "axios";

const AUTOS_ENDPOINT = import.meta.env.VITE_AUTOS_ENDPOINT;

export const getAllCars = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(AUTOS_ENDPOINT, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al obtener autos");
    }
};

export const addCar = async (auto) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(AUTOS_ENDPOINT, auto, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al agregar auto");
    }
};