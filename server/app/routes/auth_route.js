const express = require('express');
const auth = require('../middleware/auth');
const AuthController = require('../controllers/authenticationController');

module.exports = () => {
    const router = express.Router();
    const controller = new AuthController();
    router.post('/auth', (req, res) => controller.auth(req, res));
    router.post('/login', (req, res) => controller.login(req, res));
    router.post('/logout',auth, (req, res) => controller.logout(req, res));
    return router;
};
