
import axios from "./axiosInstance.js"



// Agregar un mantenimiento a un auto
const addMaintenanceToCar = async (carId, mantenimiento) => {
    try {
        const res = await axios.post(`/autos/${carId}/mantenimiento`, mantenimiento);
        return res.data;
    } catch (error) {
        console.error("Error al agregar mantenimiento:", error.message);
        throw new Error("No se pudo agregar el mantenimiento");
    }
};

// Obtener mantenimientos de un auto
const getMaintenancesByCarId = async (carId) => {
    try {
        const res = await axios.get(`/autos/${carId}/mantenimiento`);
        return res.data;
    } catch (error) {
        console.error("Error al obtener mantenimientos:", error.message);
        throw new Error("No se pudieron obtener los mantenimientos");
    }
};

const getAllcarsM = async () => {
    try {
        const res = await axios.get("/autos");
        return res.data;
    } catch (error) {
        console.error("Error al obtener autos:", error.message);
        throw new Error("No se pudieron obtener los autos");
    }
};

export { addMaintenanceToCar, getMaintenancesByCarId, getAllcarsM };
