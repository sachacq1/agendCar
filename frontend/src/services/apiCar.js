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

export const deleteCar = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`/api/catalogo/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};


export const updateCar = async (id, data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(`/api/catalogo/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};