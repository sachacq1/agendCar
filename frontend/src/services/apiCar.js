import axios from "./axiosInstance"; // si usás una instancia
// o import axios from "axios"; si no usás instancia

export const getAllCars = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/autos", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data.autos || []; // asegurate de que devuelve un array
};

export const addCar = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post("/autos", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};
