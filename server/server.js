const express = require('express');
// const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();
const port = 3000;

const whitelist = ["http://localhost:63342"]
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}))

// app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app);
app.listen(port, () => {
    console.log('We are live on ' + port);
});
