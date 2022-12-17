const {initializeApp} = require("firebase/app");
const {getDatabase} = require("firebase/database");
const {getAuth} = require("firebase/auth");
const options = require("../../config/firebase-options");

const app = initializeApp(options);

module.exports = {
    database:getDatabase(app),
    auth:getAuth(app)
}
