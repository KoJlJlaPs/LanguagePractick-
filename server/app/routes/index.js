const wordRoute = require('./word_routes');
const { Database } = require('../database/dbOption');

module.exports = function (app) {
    wordRoute(app, new Database());
};
