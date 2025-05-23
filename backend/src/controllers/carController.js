import Car from "../models/carModel.js";
import CarCatalog from "../models/catalogoCarModel.js";

// Crear un auto nuevo
const createCar = async (req, res) => {
    try {
        const userId = req.user._id;
        const { catalogId } = req.body;

        if (!userId || !catalogId) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        const autoCatalogo = await CarCatalog.findById(catalogId);

        if (!autoCatalogo) {
            return res.status(404).json({ error: "Auto no encontrado en el catálogo" });
        }

        const nuevoAuto = new Car({
            marca: autoCatalogo.marca,
            modelo: autoCatalogo.modelo,
            anio: autoCatalogo.anio,
            userId,
            mantenimientos: []
        });

        await nuevoAuto.save();

        res.status(201).json({ message: "Auto agregado exitosamente", auto: nuevoAuto });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el auto: " + error.message });
    }
};

// Agregar mantenimiento a un auto
const addMaintenance = async (req, res) => {
    try {
        const { tipo, fecha, kilometraje } = req.body;
        const { carId } = req.params;

        const auto = await Car.findOne({ _id: carId, userId });

        if (!auto) {
            return res.status(404).json({ error: "Auto no encontrado o no te pertenece" });
        }

        auto.mantenimientos.push({ tipo, fecha, kilometraje });

        await auto.save();

        res.status(200).json({ message: "Mantenimiento agregado", auto });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar mantenimiento: " + error.message });
    }
};

export { createCar, addMaintenance };
