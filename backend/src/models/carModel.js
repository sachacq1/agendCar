import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
    tipo: { type: String, required: true },         // Ej: "Cambio de aceite"
    fecha: { type: Date, required: true },          // Ej: "2025-05-20"
    kilometraje: { type: Number, required: true },  // Ej: 125000
}, { _id: false });

const carSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    anio: {                 // ⚠️ Usamos "anio" en vez de "año" para evitar errores con codificación
        type: Number,
        required: true
    },
    userId: {               // Relación con el usuario que lo creó
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    mantenimientos: [maintenanceSchema]
}, { timestamps: true });

const Car = mongoose.model("Car", carSchema);
export default Car;
