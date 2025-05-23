import mongoose from "mongoose";

const carCatalogSchema = new mongoose.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    anio: { type: Number, required: true },
}, { versionKey: false });

const CarCatalog = mongoose.model("CarCatalog", carCatalogSchema);
export default CarCatalog;
