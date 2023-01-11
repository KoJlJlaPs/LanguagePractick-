const { Exercize } = require('../controllers/wordExercizeController');
const express = require('express');
const isAuth = require('../auth/isAuth');
const attachCurrentUser = require('../auth/attachCurrentUser');

// Роутеры Слов
module.exports = () => {
    const router = express.Router();
    const exercise = new Exercize();
    router.use(isAuth, attachCurrentUser);
    router.get('/random', (req, res) => exercise.getExercize(req, res));
    router.get('/random/:type', (req, res) => exercise.getExercizeType(req, res));
    return router;
};
