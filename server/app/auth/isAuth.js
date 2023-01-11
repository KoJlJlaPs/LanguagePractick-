const { signature } = require('../../config/signature');
const { expressjwt: jwt } = require('express-jwt');

const getTokenFromHeader = (req) => {
    if (req.headers['Authorization'] && req.headers['Authorization'].split(' ')[0] === 'Bearer')
        return req.headers['Authorization'].split(' ')[1];
};

module.exports = jwt({
    secret: signature,
    userProperty: 'token',
    getToken: getTokenFromHeader,
    algorithms: ['HS256'],
});
