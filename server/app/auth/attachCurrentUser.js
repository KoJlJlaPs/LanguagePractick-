const { User } = require('../models/User');
const { signature } = require('../../config/signature');
const jwt = require('jsonwebtoken');

// Проверка авторизации пользователя
module.exports = async (req, res, next) => {
    const {cookie} = req.headers;
    // Если есть куки
    if(cookie) {
        let cookieList = {};
        const items = cookie.split(';');
        for (const item of items) {
            const parts = item.split('=');
            const key = parts[0].trim();
            const val = parts[1] || '';
            cookieList[key] = val.trim();
        }
        const decodedTokenData = jwt.verify(cookieList['auth'], signature, {algorithms: ['HS256']});
        const userRecord = await new User().getUser(decodedTokenData.token._id);
        // Если это только проверка на авторизацуию
        if (req.url === "/check-cookie") {
            if (userRecord)
                return res.status(200).send({cookie: decodedTokenData.token})
            else
                return res.status(202).send({error: 'Cookie Not Correct'});
        }
        req.currentUser = userRecord;
        if (!userRecord) return res.status(401).send({ message: 'User not found' });
        return next();
    }

    if (req.url === '/check-cookie')
        return res.status(202).send({ error: 'Cookie Not Found' });

    return res.status(401).send({ error: 'No authorization token was found' });
};
