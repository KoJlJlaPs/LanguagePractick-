const { Exercize } = require('../controllers/wordExercizeController');
const express = require('express');

// Роутеры Слов
module.exports = () => {
    const router = express.Router();
    const exercizes = new Exercize();
    router.get('/random', (req, res) => exercizes.getExercize(req, res));
    router.get('/random/:type', (req, res) => exercizes.getExercizeType(req, res));
    return router;
};
