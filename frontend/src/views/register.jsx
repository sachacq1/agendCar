import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { registerUser } from "../services/auth.js";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(username, password, email);
            if (response.token) {
                login(response.token);
                navigate("/panel");
            } else {
                alert("Error al registrarse");
            }
        } catch (error) {
            console.error("Error al registrarse: " + error.message);
            alert("Error al registrarse");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark">
            <div className="card p-4 shadow" style={{
                maxWidth: "400px", width: "100%", border: "2px solid #b5ff6a",
                backgroundColor: "black"
            }}>
                <h2 className="text-center mb-4 text-success">Registrarse</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label text-dark fw-semibold">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-dark fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-dark fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-dark w-100 text-success fw-bold">
                        Registrarse
                    </button>
                </form>
                <p className="text-center text-secondary mt-3">
                    ¿Ya tenés cuenta?{" "}
                    <Link to="/login" className="text-success fw-semibold">
                        Iniciá sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
