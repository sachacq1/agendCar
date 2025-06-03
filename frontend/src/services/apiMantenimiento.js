import axios from "axios";

const apiMantenimiento = axios.create({
    baseURL: "https://agendcar.onrender.com",
    withCredentials: true,
});

apiMantenimiento.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Agregar un mantenimiento a un auto
const addMaintenanceToCar = async (carId, mantenimiento) => {
    try {
        const res = await apiMantenimiento.post(`/autos/${carId}/mantenimientos`, mantenimiento);
        return res.data;
    } catch (error) {
        console.error("Error al agregar mantenimiento:", error.message);
        throw new Error("No se pudo agregar el mantenimiento");
    }
};

// Obtener mantenimientos de un auto
const getMaintenancesByCarId = async (carId) => {
    try {
        const res = await apiMantenimiento.get(`/autos/${carId}/mantenimientos`);
        return res.data;
    } catch (error) {
        console.error("Error al obtener mantenimientos:", error.message);
        throw new Error("No se pudieron obtener los mantenimientos");
    }
};

export { addMaintenanceToCar, getMaintenancesByCarId };