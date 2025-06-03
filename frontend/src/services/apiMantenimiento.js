import axios from "./axiosInstance.js"



// Agregar un mantenimiento a un auto
const addMantenimiento = async (carId, mantenimiento) => {
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
        const autosBase = await axios.get(`/autos/${carId}/mantenimiento`);

        const autosConMantenimientos = await Promise.all(
            autosBase.map(async (auto) => {
                const mantenimientos = await getMaintenancesByCarId(auto._id);
                return {
                    ...auto,
                    mantenimientos,
                };
            })
        );

        setAutos(autosConMantenimientos);
    } catch (error) {
        console.error("Error al cargar autos con mantenimientos:", error.message);
    }
};


export { addMantenimiento, getMaintenancesByCarId };
