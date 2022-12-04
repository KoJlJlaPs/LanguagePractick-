const setWordRoutes = require('./word_routes');

module.exports = function (app) {
    app.use('/word', setWordRoutes());
};
