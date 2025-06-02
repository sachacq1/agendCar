import axios from "./axiosInstance.js";

export const getAllCars = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/autos", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data || [];
};

export const addCar = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post("/api/catalogo", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};
