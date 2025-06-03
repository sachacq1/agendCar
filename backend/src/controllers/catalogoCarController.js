import CarCatalog from "../models/catalogoCarModel.js";

const addCarToCatalog = async (req, res) => {
    const userId = req.user._id;
    const { catalogId } = req.body;

    if (!catalogId) {
        return res.status(400).json({ error: "Falta el ID del catálogo" });
    }

    try {
        const catalogEntry = await CarCatalog.findById(catalogId);
        if (!catalogEntry) {
            return res.status(404).json({ error: "Auto no encontrado en el catálogo" });
        }

        const nuevoAuto = new Car({
            marca: catalogEntry.marca,
            modelo: catalogEntry.modelo,
            anio: catalogEntry.anio,
            userId: userId,
            mantenimientos: [],
        });

        await nuevoAuto.save();
        res.status(201).json(nuevoAuto);
    } catch (error) {
        console.error("Error al agregar auto:", error.message);
        res.status(500).json({ error: "Error al agregar auto" });
    }
};
const getCatalog = async (req, res) => {
    try {
        const autos = await CarCatalog.find();
        res.status(200).json(autos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el catálogo: " + error.message });
    }
};

const deleteCarFromCatalog = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await CarCatalog.findByIdAndDelete(id);
        if (!eliminado) {
            return res.status(404).json({ error: "Auto no encontrado" });
        }
        res.status(200).json({ message: "Auto eliminado del catálogo", auto: eliminado });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar auto: " + error.message });
    }
};

const updateCarInCatalog = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, anio } = req.body;

        const actualizado = await CarCatalog.findByIdAndUpdate(
            id,
            { marca, modelo, anio },
            { new: true, runValidators: true }
        );

        if (!actualizado) {
            return res.status(404).json({ error: "Auto no encontrado" });
        }

        res.status(200).json({ message: "Auto actualizado", auto: actualizado });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar auto: " + error.message });
    }
};

const getCarFromCatalogById = async (req, res) => {
    try {
        const { id } = req.params;
        const auto = await CarCatalog.findById(id);

        if (!auto) {
            return res.status(404).json({ error: "Auto no encontrado" });
        }

        res.status(200).json(auto);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar auto: " + error.message });
    }
};

export { getCatalog, addCarToCatalog, deleteCarFromCatalog, updateCarInCatalog, getCarFromCatalogById };
