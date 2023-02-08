const { signature,cookieName } = require('../../config/signature');
const { expressjwt: jwt } = require('express-jwt');

const getTokenFromHeader = (req) => {
    if (req.headers['auth'])
        return req.headers['auth'];
};

module.exports = jwt({
            secret: signature,
            userProperty: 'token',
            getToken: getTokenFromHeader,
            algorithms: ['HS256'],
        });
