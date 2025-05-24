import { useState } from "react";
import { loginUser } from "../services/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(username, password);
            if (response.token) {
                login(response.token);
                navigate("/panel");
            } else {
                alert("Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error al iniciar sesión: " + error.message);
            alert("Verifica tus credenciales");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark">
            <div className="card p-4 shadow" style={{
                maxWidth: "400px", width: "100%", border: "2px solid #b5ff6a",
                backgroundColor: "black"
            }}>
                <h2 className="text-center mb-4 text-success">Iniciar sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label text-dark fw-semibold">Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-dark fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-dark w-100 text-success fw-bold">
                        Ingresar
                    </button>
                </form>
                <p className="text-center text-secondary mt-3">
                    ¿No tenés cuenta?{" "}
                    <Link to="/register" className="text-success fw-semibold">
                        Registrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
