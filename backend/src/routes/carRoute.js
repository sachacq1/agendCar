import { Router } from "express";
import { createCar, addMaintenance, getCarsByUser } from "../controllers/carController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const carRoute = Router();

carRoute.post("/", verifyToken, createCar);
carRoute.get("/:carId/mantenimiento", verifyToken, getCarsByUser); // <-- ruta para obtener autos
carRoute.post("/:carId/mantenimiento", verifyToken, addMaintenance);


export { carRoute };
