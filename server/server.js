const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const whitelist = ['http://localhost:63342', 'http://127.0.0.1:5500'];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }),
);

require('./app/routes')(app);
app.listen(port, () => {
    console.log('We are live on ' + port);
});
