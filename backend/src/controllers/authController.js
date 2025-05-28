import { register, login } from "../models/authModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTRO
const Register = async (req, res) => {
    try {
        const { username, password, email, role = "user" } = req.body;

        const newUser = await register({ username, password, email, role });

        if (!newUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const token = jwt.sign(
            {
                user: newUser.username,
                role: newUser.role,
                _id: newUser._id,
            },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            message: "Usuario registrado con éxito",
            user: {
                _id: newUser._id,
                username: newUser.username,
                role: newUser.role,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

// LOGIN
const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const token = await login({ username, password });

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};

export { Register, Login };
