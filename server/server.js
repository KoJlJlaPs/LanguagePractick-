const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const dbApp = initializeApp({ databaseURL: db.url });
const database = getDatabase(dbApp);
require("./app/routes")(app, database);
app.listen(port, () => {
  console.log("We are live on " + port);
});
