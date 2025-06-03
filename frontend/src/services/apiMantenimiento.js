import axios from "./axiosInstance.js"



// Agregar un mantenimiento a un auto
const addMantenimiento = async (carId, mantenimiento) => {
    try {
        const res = await axios.post(`/autos/${carId}/mantenimientos`, mantenimiento);
        return res.data;
    } catch (error) {
        console.error("Error al agregar mantenimiento:", error.message);
        throw new Error("No se pudo agregar el mantenimiento");
    }
};

// Obtener mantenimientos de un auto
const getMaintenancesByCarId = async (carId) => {
    try {
        const res = await axios.get(`/autos/${carId}/mantenimientos`);
        return res.data;
    } catch (error) {
        console.error("Error al obtener mantenimientos:", error.message);
        throw new Error("No se pudieron obtener los mantenimientos");
    }
};

export { addMantenimiento, getMaintenancesByCarId };