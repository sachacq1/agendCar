import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // "Bearer TOKEN"

    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Token mal formado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // <-- esto agrega la info del token al req
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
};
