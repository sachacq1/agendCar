import { register, login } from "../models/authModel.js";
import jwt from "jsonwebtoken";

// process.loadEnvFile();
const Register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const data = {
            username,
            password,
            email,
            role: "user"
        }

        const user = await register(data);

        if (user === null) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return res.status(201).json({ message: "Usuario registrado con éxito", user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = {
            username,
            password
        }
        const token = await login(data);
        return res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });

    }
}

export { Register, Login }