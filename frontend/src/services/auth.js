import axios from "axios";

const loginUser = async (username, password) => {
    try {
        const response = await axios.post("https://agendcar.onrender.com/auth/login",
            { username, password });
        return response.data
    } catch (error) {
        throw new Error("Error al iniciar sesión: " + error.message);
    }
}

const registerUser = async (username, password, email) => {
    try {
        const response = await axios.post("https://agendcar.onrender.com/auth/register",
            { username, password, email });
        return response.data
    } catch (error) {
        throw new Error("Error al registrar el usuario: " + error.message);
        console.error(error);
    }
}

export { loginUser, registerUser }