import jwt from 'jsonwebtoken';
const { SECRET } = process.env || {};

const jwtMiddleware = (req, res, next) => {
    const token = req.body.token;

    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch (error) {
        res.status(401).json('Неавторизован');
    }
};

export default jwtMiddleware;