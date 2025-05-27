import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../views/login";
import Register from "../views/register";

const AppRouter = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

    </Routes>
}

export { AppRouter }