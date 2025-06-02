import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import axios from "../services/axiosInstance.js";

const AutoPanel = () => {
    const { authToken } = useAuth();
    const [catalogo, setCatalogo] = useState([]);
    const [autos, setAutos] = useState([]);
    const [nuevoAuto, setNuevoAuto] = useState({ marca: "", modelo: "", anio: "" });
    const [mantenimiento, setMantenimiento] = useState({ tipo: "", fecha: "", kilometraje: "" });
    const [selectedCarId, setSelectedCarId] = useState(null);

    const headers = {
        Authorization: `Bearer ${authToken}`
    };

    useEffect(() => {
        const fetchCatalogo = async () => {
            try {
                const res = await axios.get("/api/catalogo");
                setCatalogo(res.data);
            } catch (error) {
                console.error("Error al obtener el catálogo:", error.message);
            }
        };

        const obtenerAutos = async () => {
            try {
                const res = await axios.get("/autos", { headers });
                setAutos(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCatalogo();
        obtenerAutos();
    }, []);

    const handleChangeAuto = (e) => {
        setNuevoAuto({ ...nuevoAuto, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        window.location.href = "/home";
    };


    const agregarAuto = async () => {
        try {
            await axios.post("/autos", nuevoAuto, { headers });
            setNuevoAuto({ marca: "", modelo: "", anio: "" });
            const res = await axios.get("/autos", { headers });
            setAutos(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const agregarMantenimiento = async () => {
        try {
            await axios.post(`/autos/${selectedCarId}/mantenimiento`, mantenimiento, { headers });
            setMantenimiento({ tipo: "", fecha: "", kilometraje: "" });
            const res = await axios.get("/api/autos", { headers });
            setAutos(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container py-4" style={{ backgroundColor: "#121212", color: "#00ff88" }}>
            <h2 className="text-center mb-4">Mis Autos</h2>

            {/* Formulario: Agregar auto desde catálogo */}
            <div className="card mb-4" style={{ backgroundColor: "#1e1e1e" }}>
                <div className="card-body">
                    <h5>Agregar Auto</h5>
                    <div className="row g-2">
                        <div className="col-md-4">
                            <select name="marca" className="form-select" value={nuevoAuto.marca} onChange={handleChangeAuto} required>
                                <option value="">Marca</option>
                                {[...new Set(catalogo.map(c => c.marca))].map((marca, i) => (
                                    <option key={i} value={marca}>{marca}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <select name="modelo" className="form-select" value={nuevoAuto.modelo} onChange={handleChangeAuto} required>
                                <option value="">Modelo</option>
                                {catalogo.filter(c => c.marca === nuevoAuto.marca).map((c, i) => (
                                    <option key={i} value={c.modelo}>{c.modelo}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <select name="anio" className="form-select" value={nuevoAuto.anio} onChange={handleChangeAuto} required>
                                <option value="">Año</option>
                                {catalogo
                                    .filter(c => c.marca === nuevoAuto.marca && c.modelo === nuevoAuto.modelo)
                                    .map((c, i) => (
                                        <option key={i} value={c.anio}>{c.anio}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-success mt-3" onClick={agregarAuto}>Guardar Auto</button>
                </div>
            </div>

            {/* Lista de autos del usuario */}
            {autos.map(auto => (
                <div key={auto._id} className="card mb-3" style={{ backgroundColor: "#1e1e1e" }}>
                    <div className="card-body">
                        <h5>{auto.marca} {auto.modelo} ({auto.anio})</h5>

                        <h6>Mantenimientos:</h6>
                        <ul>
                            {auto.mantenimientos.map((m, index) => (
                                <li key={index}>{m.tipo} - {new Date(m.fecha).toLocaleDateString()} - {m.kilometraje} km</li>
                            ))}
                        </ul>

                        {/* Formulario de mantenimiento */}
                        <div className="row g-2">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tipo"
                                    value={selectedCarId === auto._id ? mantenimiento.tipo : ""}
                                    onChange={(e) => {
                                        setSelectedCarId(auto._id);
                                        setMantenimiento({ ...mantenimiento, tipo: e.target.value });
                                    }}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={selectedCarId === auto._id ? mantenimiento.fecha : ""}
                                    onChange={(e) => setMantenimiento({ ...mantenimiento, fecha: e.target.value })}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Kilometraje"
                                    value={selectedCarId === auto._id ? mantenimiento.kilometraje : ""}
                                    onChange={(e) => setMantenimiento({ ...mantenimiento, kilometraje: e.target.value })}
                                />
                            </div>
                        </div>
                        <button className="btn btn-outline-success mt-2" onClick={agregarMantenimiento}>Agregar Mantenimiento</button>
                    </div>
                </div>
            ))}
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-danger" onClick={handleLogout}>More actions
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default AutoPanel;
