import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { auth } from "../../../backend/src/middlewares/authMiddleware";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || null);
    const [user, setUser] = useState(localStorage.getItem("user") || null);
    const navigate = useNavigate();

    const checkTokenExpiration = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            return true;
        }
    };

    const login = (token) => {

        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);

        setAuthToken(token);
        setRole(decoded.role);
        setUser(decoded.user);

        localStorage.setItem("role", decoded.role);
        localStorage.setItem("user", decoded.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        setAuthToken(null);
        setRole(null);
        setUser(null);
    };

    useEffect(() => {
        if (!authToken) return;

        const isExpired = checkTokenExpiration(authToken);
        if (isExpired) {
            console.warn("Token expirado");
            logout();
            navigate("/login");
        } else {
            try {
                const decoded = jwtDecode(authToken);
                setRole(decoded.role);
                setUser(decoded.user);

                localStorage.setItem("role", decoded.role);
                localStorage.setItem("user", decoded.user);

            } catch (error) {
                console.error("Error al decodificar el token:", error);
                logout();
                navigate("/login");

            }
        }
    }, [])


    return (
        <AuthContext.Provider value={{ authToken, role, user, login, logout, isAuthenticated: !!authToken }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
