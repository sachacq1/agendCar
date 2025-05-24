import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../views/login";

const AppRouter = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
    </Routes>
}

export { AppRouter }