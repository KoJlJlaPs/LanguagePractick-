const { Exercize } = require('../controllers/wordExercizeController');
const express = require('express');
const auth = require('../middleware/auth');

// Роутеры Слов
module.exports = () => {
    const router = express.Router();
    const exercise = new Exercize();
    router.use(auth);
    router.get('/random', (req, res) => exercise.getExercize(req, res));
    router.get('/random/:type', (req, res) => exercise.getExercizeType(req, res));
    return router;
};
