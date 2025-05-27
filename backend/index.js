import express from "express";
import { connectDb } from "./src/config/mongoDb.js";
import { authRoute } from "./src/routes/authRoute.js";
import { carRoute } from "./src/routes/carRoute.js";
import { catalogRoute } from "./src/routes/catalogoCarRoute.js";
import helmet from "helmet";
import cors from "cors";

// process.loadEnvFile();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(cors(
    {
        origin: "https://agend-car.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://agend-car.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());


app.use("/auth", authRoute)
app.use("/autos", carRoute)
app.use("/api/catalogo", catalogRoute)

app.get("/", (req, res) => {
    res.send("API funcionando correctamente");
});





connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Servidor en puerto ", PORT);
    })
})