import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PanelAdmin from "./pages/PanelAdmin.jsx";
import AutoPanel from "./pages/AutoPanel.jsx";
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
