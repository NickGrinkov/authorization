import User from "./models/User.js";
import Role from "./models/Role.js";
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

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
            const userRole = await Role.findOne({ value: 'USER' })
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
            
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getUsers(req, res) {
        try {
            res.json('Done')
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AuthController();