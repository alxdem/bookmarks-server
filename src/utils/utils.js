import jwt from 'jsonwebtoken';
const { SECRET } = process.env || {};

const getError = (message, error) => {
    return {
        isError: true,
        message,
        error
    }
};

const generateAccessToken = (userId) => {
    const payload = {
        userId,
    };

    return jwt.sign(payload, SECRET, {
        expiresIn: '24h',
    });
};

export {
    getError,
    generateAccessToken,
}