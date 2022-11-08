import User from "./models/User.js";
import Role from "./models/Role.js";
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { secret } from "./config.js";
import { json } from "express";

const generateAccessToken = (id, roles) => {
    const payload = { id, roles };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.status(400).json({ message: 'Ошибка при регистрации', errors })
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if(candidate) {
                res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'USER' });
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save();
            return res.json({ message: 'Пользователь успешно зарегестрирован' })
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if(!user) {
                res.status(400).json({ message: `Пользователь ${username} не найден` })
            }
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if(!isPasswordValid) {
                res.status(400).json({ message: `Введен неверный пароль` })
            }
            const token = generateAccessToken(user._id, user.roles);
            res.json({ token });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json({ users });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AuthController();