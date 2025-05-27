import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// process.loadEnvFile();

const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, "Por favor ingresa un correo electrónico válido"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model("User", userSchema);

const register = async (data) => {

    try {
        const existingUser = await User.findOne({ username: data.username });
        if (existingUser) {
            return null
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = new User({
            username: data.username,
            password: hashedPassword,
            email: data.email,
            role: "user",

        })

        await newUser.save();
        return newUser
    } catch (error) {

        throw new Error("Error al registrar el usuario: " + error.message);
    }
};

const login = async (data) => {
    try {
        const user = await User.findOne({ username: data.username });
        if (!user) {
            throw new Error("El usuario no existe");
        }

        const matchPass = await bcrypt.compare(data.password, user.password);
        if (!matchPass) {
            throw new Error("Contraseña o usuario incorrecto");
        }

        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        return token;
    } catch (error) {
        throw new Error("Error al iniciar sesión: " + error.message);
    }
};


export { register, login };
export default User;
