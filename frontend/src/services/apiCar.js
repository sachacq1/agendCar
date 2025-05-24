import axios from "axios";

const apiCar = axios.create({
    baseURL: "https://agendcar.onrender.com",
    withcredentials: true
});

apiCar.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

})

const getAllCars = async () => {

    try {
        const response = await apiCar.get("/autos");
        return response.data
    } catch (error) {
        throw new Error("Error al obtener los autos: " + error.message);
    }

}

const addCar = async (newCar) => {

    try {
        const response = await apiCar.post("/autos", newCar);
        alert("Auto agregado con exito")
    } catch (error) {
        console.log("Error al agregar el auto: " + error.message);
        throw new Error("Error al agregar el auto: " + error.message);
    }
}

const updateCar = async (id, updatedCar) => {
    try {
        const response = await apiCar.put(`/autos/${id}`, updatedCar);
        alert("Auto actualizado con exito")
    } catch (error) {
        console.log("Error al actualizar el auto: " + error.message);
        throw new Error("Error al actualizar el auto: " + error.message);
    }
}

const deleteCar = async (id) => {

    try {
        const response = await apiCar.delete(`/autos/${id}`);
        alert("Auto eliminado con exito")
    } catch (error) {
        console.error("Error al eliminar el auto: " + error.message);
        throw new Error("Error al eliminar el auto: " + error.message);
    }
}

const getCarById = async (id) => {
    try {
        const response = await apiCar.get(`/autos/${id}`);
        return response.data
    } catch (error) {
        console.error("Error al obtener el auto: " + error.message);
        throw new Error("Error al obtener el auto: " + error.message);
    }
}

export { getAllCars, addCar, updateCar, deleteCar, getCarById }