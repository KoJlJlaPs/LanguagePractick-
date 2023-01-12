const isAuth = require("../auth/isAuth");
const attachCurrentUser = require("../auth/attachCurrentUser");

module.exports = [isAuth,attachCurrentUser]