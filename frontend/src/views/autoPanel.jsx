import { useEffect, useState } from "react";
import { getAllCars, addCar } from "../services/apiCar";
import axios from "axios";

const AutoPanel = () => {
    const [autos, setAutos] = useState([]);
    const [catalogo, setCatalogo] = useState([]);
    const [nuevoAuto, setNuevoAuto] = useState({
        marca: "",
        modelo: "",
        anio: ""
    });

    // Ahora mantenimientosInputs es un objeto donde la key es el id del auto
    const [mantenimientosInputs, setMantenimientosInputs] = useState({});

    // Obtener catálogo de autos
    const obtenerCatalogo = async () => {
        try {
            const res = await axios.get("https://agendcar.onrender.com/api/catalogo");
            setCatalogo(res.data);
        } catch (error) {
            console.error("Error al obtener catálogo:", error.message);
        }
    };

    // Obtener autos del usuario
    const obtenerAutos = async () => {
        try {
            const res = await getAllCars();
            setAutos(res);
        } catch (error) {
            console.error("Error al cargar autos:", error.message);
        }
    };

    // Agregar auto nuevo
    const handleAgregarAuto = async () => {
        if (!nuevoAuto.marca || !nuevoAuto.modelo || !nuevoAuto.anio) {
            alert("Completa todos los campos del auto");
            return;
        }
        try {
            await addCar(nuevoAuto);
            setNuevoAuto({ marca: "", modelo: "", anio: "" });
            obtenerAutos();
        } catch (error) {
            alert("Error al agregar el auto");
        }
    };

    // Agregar mantenimiento a un auto específico
    const handleAgregarMantenimiento = async (autoId) => {
        const mantenimiento = mantenimientosInputs[autoId];
        if (
            !mantenimiento ||
            !mantenimiento.tipo ||
            !mantenimiento.fecha ||
            !mantenimiento.kilometraje
        ) {
            alert("Completa todos los campos del mantenimiento");
            return;
        }

        try {
            await axios.post(
                `https://agendcar.onrender.com/autos/${autoId}/mantenimientos`,
                mantenimiento
            );
            // Limpio inputs de ese auto
            setMantenimientosInputs({
                ...mantenimientosInputs,
                [autoId]: { tipo: "", fecha: "", kilometraje: "" },
            });
            obtenerAutos();
        } catch (error) {
            console.error("Error al agregar mantenimiento:", error.message);
            alert("Error al agregar mantenimiento");
        }
    };

    // Filtrar modelos según marca seleccionada
    const modelosFiltrados = catalogo
        .filter((item) => item.marca === nuevoAuto.marca)
        .map((item) => item.modelo);

    // Filtrar años según marca y modelo seleccionados
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

    return (
        <div
            className="container py-4"
            style={{ backgroundColor: "#121212", color: "#00ff88" }}
        >
            <h2 className="text-center mb-4">Mis Autos</h2>

            {/* Formulario de nuevo auto */}
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
                                    })
                                }
                            >
                                <option value="">Marca</option>
                                {[...new Set(catalogo.map((c) => c.marca))].map((marca, i) => (
                                    <option key={i} value={marca}>
                                        {marca}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={nuevoAuto.modelo}
                                onChange={(e) =>
                                    setNuevoAuto({ ...nuevoAuto, modelo: e.target.value, anio: "" })
                                }
                                disabled={!nuevoAuto.marca}
                            >
                                <option value="">Modelo</option>
                                {[...new Set(modelosFiltrados)].map((modelo, i) => (
                                    <option key={i} value={modelo}>
                                        {modelo}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={nuevoAuto.anio}
                                onChange={(e) =>
                                    setNuevoAuto({ ...nuevoAuto, anio: e.target.value })
                                }
                                disabled={!nuevoAuto.modelo}
                            >
                                <option value="">Año</option>
                                {[...new Set(aniosFiltrados)].map((anio, i) => (
                                    <option key={i} value={anio}>
                                        {anio}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-success mt-3" onClick={handleAgregarAuto}>
                        Guardar Auto
                    </button>
                </div>
            </div>

            {/* Lista de autos */}
            {autos.map((auto) => (
                <div
                    key={auto._id}
                    className="card mb-3"
                    style={{ backgroundColor: "#1e1e1e" }}
                >
                    <div className="card-body">
                        <h5>
                            {auto.marca} {auto.modelo} ({auto.anio})
                        </h5>

                        <h6>Mantenimientos:</h6>
                        <ul>
                            {auto.mantenimientos && auto.mantenimientos.length > 0 ? (
                                auto.mantenimientos.map((m, index) => (
                                    <li key={index}>
                                        {m.tipo} - {new Date(m.fecha).toLocaleDateString()} -{" "}
                                        {m.kilometraje} km
                                    </li>
                                ))
                            ) : (
                                <li>No hay mantenimientos cargados</li>
                            )}
                        </ul>

                        {/* Form para agregar mantenimiento */}
                        <div className="row g-2">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tipo"
                                    value={mantenimientosInputs[auto._id]?.tipo || ""}
                                    onChange={(e) =>
                                        setMantenimientosInputs({
                                            ...mantenimientosInputs,
                                            [auto._id]: {
                                                ...mantenimientosInputs[auto._id],
                                                tipo: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={mantenimientosInputs[auto._id]?.fecha || ""}
                                    onChange={(e) =>
                                        setMantenimientosInputs({
                                            ...mantenimientosInputs,
                                            [auto._id]: {
                                                ...mantenimientosInputs[auto._id],
                                                fecha: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Kilometraje"
                                    value={mantenimientosInputs[auto._id]?.kilometraje || ""}
                                    onChange={(e) =>
                                        setMantenimientosInputs({
                                            ...mantenimientosInputs,
                                            [auto._id]: {
                                                ...mantenimientosInputs[auto._id],
                                                kilometraje: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-outline-success mt-2"
                            onClick={() => handleAgregarMantenimiento(auto._id)}
                        >
                            Agregar Mantenimiento
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AutoPanel;
