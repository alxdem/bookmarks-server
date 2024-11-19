import express from 'express';
import authController from '../controllers/authController.js';
import { check } from 'express-validator';

const authRouter = express();
const passwordParams = {
    min: 6,
    max: 10,
}

authRouter.post('/registration', [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check(
        'password',
        `Пароль должен быть не менее ${passwordParams.min} и не более ${passwordParams.max} символов`
    ).isLength({
        min: passwordParams.min,
        max: passwordParams.max,
    })
], authController.registration);

authRouter.post('/login', authController.login);

export default authRouter;