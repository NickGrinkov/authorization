import jwt from "jsonwebtoken";
import { secret } from "../config.js";

export const authMiddleware = (req, res, next) => {
    if(req.method === 'options') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(req.headers);
        if(!token) {
            res.status(403).json({ message: "Пользователь не авторизован" })
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (error) {
        res.status(403).json({ message: "Пользователь не авторизован" })
    }
}