import { Router } from "express";
import { createCar, addMaintenance } from "../controllers/carController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const carRoute = Router();

carRoute.post("/", verifyToken, createCar);
carRoute.post("/:carId/mantenimiento", verifyToken, addMaintenance);

export { carRoute };