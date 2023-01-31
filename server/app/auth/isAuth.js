const { signature } = require('../../config/signature');
const { expressjwt: jwt } = require('express-jwt');

const getTokenFromHeader = (req) => {
    if (req.cookies.Authorization)
        return req.cookies.Authorization;
};

module.exports = jwt({
            secret: signature,
            userProperty: 'token',
            getToken: getTokenFromHeader,
            algorithms: ['HS256'],
        });
