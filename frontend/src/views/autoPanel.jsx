import { useEffect, useState } from "react";
import { getAllCars, addCar } from "../services/apiCar.js";
import { addMantenimiento, getMaintenancesByCarId } from "../services/apiMantenimiento.js";
import axios from "../services/axiosInstance.js";

const AutoPanel = () => {
    const [autos, setAutos] = useState([]);
    const [catalogo, setCatalogo] = useState([]);
    const [nuevoAuto, setNuevoAuto] = useState({
        marca: "",
        modelo: "",
        anio: "",
        catalogId: ""
    });
    const [mantenimiento, setMantenimiento] = useState({
        tipo: "",
        fecha: "",
        kilometraje: ""
    });
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [mostrarFormularioAuto, setMostrarFormularioAuto] = useState(false);

    const obtenerCatalogo = async () => {
        try {
            const res = await axios.get("/api/catalogo");
            setCatalogo(res.data);
        } catch (error) {
            console.error("Error al obtener catálogo:", error.message);
        }
    };

    const obtenerAutos = async () => {
        try {
            const res = await getMaintenancesByCarId();
            setAutos(res);
        } catch (error) {
            console.error("Error al cargar autos:", error.message);
        }
    };

    const handleAgregarAuto = async () => {
        if (!nuevoAuto.catalogId) {
            alert("Seleccioná un auto del catálogo");
            return;
        }
        try {
            await addCar({ catalogId: nuevoAuto.catalogId });
            setNuevoAuto({ marca: "", modelo: "", anio: "", catalogId: "" });
            await obtenerAutos();
        } catch (error) {
            console.error("Error al agregar el auto:", error.message);
            alert("No se pudo agregar el auto");
        }
    };

    const handleAgregarMantenimiento = async (carId) => {
        try {
            await addMantenimiento(carId, mantenimiento);
            setMantenimiento({ tipo: "", fecha: "", kilometraje: "" });
            await obtenerAutos();
        } catch (error) {
            console.error("Error al agregar mantenimiento:", error.message);
        }
    };

    const modelosFiltrados = catalogo
        .filter((item) => item.marca === nuevoAuto.marca)
        .map((item) => item.modelo);

    const aniosFiltrados = catalogo
        .filter(
            (item) =>
                item.marca === nuevoAuto.marca && item.modelo === nuevoAuto.modelo
        )
        .map((item) => item.anio);

    useEffect(() => {
        obtenerCatalogo();
        obtenerAutos();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        window.location.href = "/home";
    };

    return (
        <div className="container py-4 vh-100 w-100" style={{ backgroundColor: "#121212", color: "#00ff88", opacity: "0.8" }}>
            <h2 className="text-center mb-4">Mis Autos</h2>

            <button
                className="btn btn-secondary mb-3"
                onClick={() => setMostrarFormularioAuto(!mostrarFormularioAuto)}
            >
                {mostrarFormularioAuto ? "Ocultar Formulario" : "Agregar Auto"}
            </button>

            {mostrarFormularioAuto && (
                <div className="card mb-4" style={{ backgroundColor: "#1e1e1e" }}>
                    <div className="card-body">
                        <h5>Agregar Auto</h5>
                        <div className="row g-2">
                            <div className="col-md-4">
                                <select
                                    className="form-select"
                                    value={nuevoAuto.marca}
                                    onChange={(e) =>
                                        setNuevoAuto({
                                            marca: e.target.value,
                                            modelo: "",
                                            anio: "",
                                            catalogId: ""
                                        })
                                    }
                                >
                                    <option value="">Marca</option>
                                    {[...new Set(catalogo.map((c) => c.marca))].map((marca, i) => (
                                        <option key={i} value={marca}>{marca}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-4">
                                <select
                                    className="form-select"
                                    value={nuevoAuto.modelo}
                                    onChange={(e) =>
                                        setNuevoAuto({
                                            ...nuevoAuto,
                                            modelo: e.target.value,
                                            anio: "",
                                            catalogId: ""
                                        })
                                    }
                                    disabled={!nuevoAuto.marca}
                                >
                                    <option value="">Modelo</option>
                                    {[...new Set(modelosFiltrados)].map((modelo, i) => (
                                        <option key={i} value={modelo}>{modelo}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-4">
                                <select
                                    className="form-select"
                                    value={nuevoAuto.catalogId}
                                    onChange={(e) => {
                                        const selected = catalogo.find(c => c._id === e.target.value);
                                        setNuevoAuto({
                                            catalogId: selected._id,
                                            marca: selected.marca,
                                            modelo: selected.modelo,
                                            anio: selected.anio
                                        });
                                    }}
                                    disabled={!nuevoAuto.modelo}
                                >
                                    <option value="">Año</option>
                                    {catalogo
                                        .filter((c) =>
                                            c.marca === nuevoAuto.marca &&
                                            c.modelo === nuevoAuto.modelo
                                        )
                                        .map((auto) => (
                                            <option key={auto._id} value={auto._id}>
                                                {auto.anio}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <button className="btn btn-success mt-3" onClick={handleAgregarAuto}>
                            Agregar Auto
                        </button>
                    </div>
                </div>
            )}

            <div>
                {autos.length === 0 ? (
                    <p>No tenés autos agregados</p>
                ) : (
                    autos.map((auto) => (
                        <div
                            key={auto._id}
                            className="card mb-3"
                            style={{
                                backgroundColor:
                                    selectedCarId === auto._id ? "#333" : "#1e1e1e",
                            }}
                        >
                            <div className="card-body">
                                <h5 className="text-white">{auto.marca} {auto.modelo} {auto.anio}</h5>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                        setSelectedCarId(
                                            selectedCarId === auto._id ? null : auto._id
                                        )
                                    }
                                >
                                    {selectedCarId === auto._id ? "Ocultar Mantenimientos" : "Ver Mantenimientos"}
                                </button>

                                {selectedCarId === auto._id && (
                                    <div className="mt-3">
                                        <ul className="text-white">
                                            {!auto.mantenimientos || auto.mantenimientos.length === 0 ? (
                                                <li>No hay mantenimientos</li>
                                            ) : (
                                                auto.mantenimientos.map((m, idx) => (
                                                    <li key={idx}>
                                                        {m.tipo} - {new Date(m.fecha).toLocaleDateString()} - {m.kilometraje} km
                                                    </li>
                                                ))
                                            )}
                                        </ul>

                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                placeholder="Tipo"
                                                className="form-control mb-2"
                                                value={mantenimiento.tipo}
                                                onChange={(e) =>
                                                    setMantenimiento({
                                                        ...mantenimiento,
                                                        tipo: e.target.value,
                                                    })
                                                }
                                            />
                                            <input
                                                type="date"
                                                className="form-control mb-2"
                                                value={mantenimiento.fecha}
                                                onChange={(e) =>
                                                    setMantenimiento({
                                                        ...mantenimiento,
                                                        fecha: e.target.value,
                                                    })
                                                }
                                            />
                                            <input
                                                type="number"
                                                placeholder="Kilometraje"
                                                className="form-control mb-2"
                                                value={mantenimiento.kilometraje}
                                                onChange={(e) =>
                                                    setMantenimiento({
                                                        ...mantenimiento,
                                                        kilometraje: Number(e.target.value),
                                                    })
                                                }
                                            />
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleAgregarMantenimiento(auto._id)}
                                            >
                                                Agregar Mantenimiento
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default AutoPanel;
