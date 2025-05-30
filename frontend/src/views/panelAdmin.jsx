import { useState } from "react";
import { addCar } from "../services/apiCar.js";

const PanelAdmin = () => {
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [anio, setAnio] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!marca || !modelo || !anio) return alert("Todos los campos son obligatorios");

        try {
            await addCar({ marca, modelo, anio });
            alert("Auto agregado correctamente");
            setMarca(""); setModelo(""); setAnio("");
        } catch (error) {
            console.error(error);
            alert("Error al agregar auto");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow bg-dark text-white">
                <h2 className="text-success text-center mb-4">Agregar Auto al Catálogo</h2>
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
                    <button className="btn btn-success w-100 fw-bold">Agregar Auto</button>
                </form>
            </div>
        </div>
    );
};

export default PanelAdmin;
