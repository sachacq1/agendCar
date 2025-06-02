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
            if (!decoded.exp) return false;
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            return true;
        }
    };

    // Login: guarda token y datos en localStorage y en estado
    const login = (token) => {
        try {
            const decoded = jwtDecode(token);

            localStorage.setItem("token", token);
            localStorage.setItem("role", decoded.role);
            localStorage.setItem("user", JSON.stringify(decoded.user)); // Guarda como string

            setAuthToken(token);
            setRole(decoded.role);
            setUser(decoded.user);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
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

    // Al montar, revisa si hay datos en localStorage
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
                } catch (error) {
                    console.error("Error al parsear el usuario:", error);
                    setUser(null);
                }
            }
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authToken,
                role,
                user,
                login,
                logout,
                isAuthenticated: !!authToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
