const express = require('express');
const { Auth } = require('../controllers/authenticationController');

module.exports = () => {
    const router = express.Router();
    const controller = new Auth();
    router.post('/auth', controller.auth);
    router.post('/login', controller.login);
    router.post('/test', (req, res) => {
        console.log(req.query);
        res.end('Exit');
    });
    return router;
};
