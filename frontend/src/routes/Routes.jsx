import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/home.jsx"
import Login from "../views/login.jsx";
import Register from "../views/register.jsx";
import PanelAdmin from "../views/panelAdmin.jsx";
import AutoPanel from "../views/autoPanel.jsx";
import { useAuth } from "./context/authContext.jsx";

const PublicRoute = ({ children }) => children;

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const { isAuthenticated, role } = useAuth();
    return isAuthenticated && role === "admin" ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

            <Route path="/panel" element={
                <PrivateRoute>
                    <AutoPanel />
                </PrivateRoute>
            } />

            <Route path="/admin-panel" element={
                <AdminRoute>
                    <PanelAdmin />
                </AdminRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;
