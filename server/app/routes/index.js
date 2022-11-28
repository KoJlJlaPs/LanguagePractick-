const wordRoute = require("./word_routes");
module.exports = function (app, db) {
  wordRoute(app, db);
};
