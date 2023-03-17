const { Exercise } = require('../controllers/wordExercizeController');
const express = require('express');
const attachCurrentUser = require('../auth/attachCurrentUser');

// Роутеры Слов
module.exports = () => {
    const router = express.Router();
    const exercise = new Exercise();
    router.use(attachCurrentUser);
    router.get('/random', (req, res) => exercise.getExercize(req, res));
    router.get('/random/:type', (req, res) => exercise.getExercizeType(req, res));
    return router;
};
