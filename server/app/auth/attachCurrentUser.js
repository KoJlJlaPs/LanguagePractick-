const { User } = require('../models/User');
const { signature } = require('../../config/signature');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    if (req.headers['auth']) {
        const decodedTokenData = jwt.verify(reg.headers['auth'], signature, {
            algorithms: ['HS256'],
        });
        console.log(decodedTokenData);
        let userRecord;
        if (req.url === '/check-cookie') {
            userRecord = await new User().getUser(decodedTokenData.token._id);
            if (userRecord) return res.status(200).send({ cookie: decodedTokenData.token });
            else return res.status(202).send({ error: 'Cookie Not Correct' });
        }
        userRecord = await new User().getUser(decodedTokenData._id);
        req.currentUser = userRecord;
        if (!userRecord) return res.status(401).send({ message: 'User not found' });
        return next();
    }
    if (req.url === '/check-cookie') return res.status(202).send({ error: 'Cookie Not Found' });

    return res.status(401).send({ error: 'No authorization token was found' });
};
