import jwt from 'jsonwebtoken';
const { SECRET } = process.env || {};

const jwtMiddleware = (req, res, next) => {
    const authorizationData = req.headers.authorization;
    const token = authorizationData.split(' ')[1] || '';

    console.log('++ token', token);
    console.log('req.headers', req.headers);
    console.log('req.header', req.header);

    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch (error) {
        res.status(401).json('Неавторизован');
    }
};

export default jwtMiddleware;