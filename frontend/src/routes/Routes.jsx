import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../views/login";
import Register from "../views/register";
import AutoPanel from "../views/autoPanel";
import Home from "../views/home";
import PanelAdmin from "../views/panelAdmin";

const AppRouter = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/panel" element={<AutoPanel />} />
        <Route path="/home" element={<Home />} />
        <Route path="/panelAdmin" element={<PanelAdmin />} />


    </Routes>
}

export { AppRouter }