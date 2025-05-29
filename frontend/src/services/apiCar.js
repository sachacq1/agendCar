import axios from "axios";

const URL = "https://agendcar.onrender.com/autos";

export const getAllCars = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(URL, {
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
        const res = await axios.post(URL, auto, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al agregar auto");
    }
};
