import { Router } from "express";
import { Register, Login } from "../controllers/authController.js";

const authRoute = Router();

authRoute.post("/register", Register);
authRoute.post("/login", Login);



export { authRoute };