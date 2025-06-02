import { useState, useEffect } from "react";
import { addCar, getAllCars, deleteCar, updateCar } from "../services/apiCar.js";

const PanelAdmin = () => {
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [anio, setAnio] = useState("");
    const [catalogo, setCatalogo] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [autoEditando, setAutoEditando] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    const cargarCatalogo = async () => {
        try {
            const data = await getAllCars();
            setCatalogo(data);
        } catch (error) {
            console.error("Error al obtener el catálogo:", error);
        }
    };

    useEffect(() => {
        cargarCatalogo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!marca || !modelo || !anio) return alert("Todos los campos son obligatorios");

        if (anio < 1900 || anio > new Date().getFullYear()) return alert("El año debe ser válido");

        try {
            if (modoEdicion && autoEditando) {
                await updateCar(autoEditando._id, { marca, modelo, anio });
                alert("Auto actualizado correctamente");
            } else {
                await addCar({ marca, modelo, anio });
                alert("Auto agregado correctamente");
            }

            resetFormulario();
            cargarCatalogo();
        } catch (error) {
            console.error(error);
            alert("Error al guardar auto");
        }
    };

    const resetFormulario = () => {
        setMarca("");
        setModelo("");
        setAnio("");
        setModoEdicion(false);
        setAutoEditando(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const handleEditar = (auto) => {
        setMarca(auto.marca);
        setModelo(auto.modelo);
        setAnio(auto.anio);
        setModoEdicion(true);
        setAutoEditando(auto);
    };

    const handleEliminar = async (id) => {
        if (confirm("¿Estás seguro de eliminar este auto?")) {
            try {
                await deleteCar(id);
                alert("Auto eliminado");
                cargarCatalogo();
            } catch (error) {
                console.error(error);
                alert("Error al eliminar auto");
            }
        }
    };

    const autosFiltrados = catalogo.filter(auto =>
        `${auto.marca} ${auto.modelo} ${auto.anio}`
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow bg-dark text-white">
                <h2 className="text-success text-center mb-4">
                    {modoEdicion ? "Editar Auto" : "Agregar Auto al Catálogo"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Marca</label>
                        <input
                            type="text"
                            className="form-control"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Modelo</label>
                        <input
                            type="text"
                            className="form-control"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Año</label>
                        <input
                            type="number"
                            className="form-control"
                            value={anio}
                            onChange={(e) => setAnio(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-success w-100 fw-bold mb-2">
                        {modoEdicion ? "Actualizar Auto" : "Agregar Auto"}
                    </button>

                    {modoEdicion && (
                        <button
                            type="button"
                            className="btn btn-secondary w-100 fw-bold"
                            onClick={resetFormulario}
                        >
                            Cancelar Edición
                        </button>
                    )}
                </form>
            </div>

            <div className="d-flex justify-content-center my-4">
                <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>

            <h3 className="text-white mt-4">Buscar en el Catálogo:</h3>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar por marca, modelo o año"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <h3 className="text-white">Resultados:</h3>
            {autosFiltrados.length === 0 ? (
                <p className="text-white">No se encontraron autos.</p>
            ) : (
                <ul className="list-group">
                    {autosFiltrados.map((auto) => (
                        <li
                            key={auto._id}
                            className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"
                        >
                            {auto.marca} {auto.modelo} {auto.anio}
                            <div>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEditar(auto)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleEliminar(auto._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PanelAdmin;
