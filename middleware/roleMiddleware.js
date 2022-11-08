import jwt from "jsonwebtoken";
import { secret } from "../config.js";

export const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if(req.method === 'options') {
            next();
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                res.status(403).json({ message: "Пользователь не авторизован" })
            }
            const { roles: userRoles } = jwt.verify(token, secret);
            let hasRole = false;
            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true;
                }
            })
            if(!hasRole) {
                res.status(403).json({ message: "У вас нет доступа" })
            }
            next();
        } catch (error) {
            res.status(403).json({ message: "Пользователь не авторизован" })
        }
    }
    
}