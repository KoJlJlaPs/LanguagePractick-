const express = require('express');
const AuthController = require('../controllers/authenticationController');
const attachCurrentUser = require('../auth/attachCurrentUser');

module.exports = () => {
    const router = express.Router();
    const controller = new AuthController();
    router.post('/auth', (req, res) => controller.auth(req, res));
    router.post('/login', (req, res) => controller.login(req, res));
    router.post('/logout',attachCurrentUser, (req, res) => controller.logout(req, res));
    router.get('/check-cookie',attachCurrentUser);
    return router;
};
