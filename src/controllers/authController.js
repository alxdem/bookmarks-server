import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import UserModel from '../models/users.js';
import { getError, generateAccessToken } from '../utils/utils.js';

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Ошибка при регистрации', errors
                })
            }

            const { name, password } = req.body || {};
            const candidate = await UserModel.findOne({
                name,
            });

            if (candidate) {
                return res.status(400).json(getError('Пользователь с таким именем уже существует'))
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new UserModel({
                name,
                password: hashPassword,
            });

            user.save();

            return res.json(user);
        } catch (err) {
            console.log('err', err);
            res.status(400).json(getError('Ошибка регистрации'));
            return err;
        }
    }

    async login(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        try {
            const { name, password } = req.body || {};
            const user = await UserModel.findOne({ name });

            if (!user) {
                return res.status(400).json({
                    message: `Пользователь с именем ${name} не найден`
                })
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({
                    message: 'Введен не верный пароль'
                })
            }

            const token = generateAccessToken(user._id);

            return res.json({ token });
        } catch (err) {
            res.status(400).json(getError('Ошибка авторизации'));
            console.log('err', err);
            return err;
        }
    }
}

export default new AuthController();