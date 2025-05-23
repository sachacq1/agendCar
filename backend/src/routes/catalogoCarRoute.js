import { Router } from "express";
import {
    getCatalog,
    addCarToCatalog,
    deleteCarFromCatalog,
    updateCarInCatalog,
    getCarFromCatalogById
} from "../controllers/catalogoCarController.js";

const catalogRoute = Router();

catalogRoute.post("/", addCarToCatalog);        // Crear
catalogRoute.get("/", getCatalog);              // Leer
catalogRoute.delete("/:id", deleteCarFromCatalog); // Eliminar
catalogRoute.put("/:id", updateCarInCatalog);   // Actualizar
catalogRoute.get("/:id", getCarFromCatalogById); // Leer por id


export { catalogRoute };
