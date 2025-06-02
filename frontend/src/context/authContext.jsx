import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Verifica si el token está vencido
    const checkTokenExpiration = (token) => {
        try {
            const decoded = jwtDecode(token);
            if (!decoded.exp) return false; // Si no tiene exp, lo consideramos válido
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            return true; // Token inválido
        }
    };

    // Login: guarda el token y datos en localStorage y estado
    const login = (token) => {
        const decoded = jwtDecode(token);

        localStorage.setItem("token", token);
        localStorage.setItem("role", decoded.role);
        localStorage.setItem("user", JSON.stringify(decoded.user));


        setAuthToken(token);
        setRole(decoded.role);
        setUser(JSON.parse(localStorage.getItem("user")));

    };

    // Logout: limpia todo
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        setAuthToken(null);
        setRole(null);
        setUser(null);
    };


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        const storedUser = localStorage.getItem("user");

        if (storedToken) {
            const isExpired = checkTokenExpiration(storedToken);

            if (isExpired) {
                console.warn("Token expirado. Cerrando sesión...");
                logout();
                if (window.location.pathname !== "/login") {
                    navigate("/login");
                }
            } else {
                setAuthToken(storedToken);
                setRole(storedRole);
                try {
                    setUser(JSON.parse(storedUser));
                } catch {
                    setUser(null);
                }
            }
        }
    }, []);


    return (
        <AuthContext.Provider value={{ authToken, role, user, login, logout, isAuthenticated: !!authToken }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
