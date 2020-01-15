const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    console.log(req.headers.authorization);
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            console.log('dd');
            return res.status(401).json({ message: 'Ошибка авторизации - token' })
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();

    } catch (e) {
        console.log('catch');
        return res.status(401).json({ message: 'Ошибка авторизации - catch' })
    }
};
