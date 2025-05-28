import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { registerUser } from "../services/auth.js";

const Register = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(form);
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
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-dark fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-dark fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
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
