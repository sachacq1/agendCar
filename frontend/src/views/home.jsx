import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-white text-center px-3">
            <h1 className="mb-4 text-success fw-bold">Bienvenido a AgendCar 🚗</h1>
            <p className="mb-4 fs-5 text-light">
                Gestioná tus autos y mantenimientos de forma rápida y sencilla.
            </p>

            <div className="d-flex gap-3">
                <Link to="/login" className="btn btn-success px-4 fw-semibold">
                    Iniciar sesión
                </Link>
                <Link to="/register" className="btn btn-outline-light px-4 fw-semibold">
                    Registrarse
                </Link>
            </div>
        </div>
    );
};

export default Home;
