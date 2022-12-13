const setWordRoutes = require('./word_routes');
const setUserRoutes = require('./auth_route');

module.exports = function (app) {
    app.use('/word', setWordRoutes());
    app.use('/user', setUserRoutes());
};
