import mongoose from "mongoose";

process.loadEnvFile();

const URI = process.env.MONGODB_URI;

export const connectDb = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Base de datos conectada correctamente");
    } catch (error) {
        console.error("Error al conectar a la base de datos: ", error);
        process.exit(1);
    }
}

