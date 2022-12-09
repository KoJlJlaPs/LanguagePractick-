const { Exercize } = require('../controllers/wordExercizeController');
const express = require('express');

// Роутеры Слов
module.exports = () => {
    const router = express.Router();
    const exercizes = new Exercize();
    router.get('/random', exercizes.getExercize);
    router.get('/random/:type', exercizes.getExercizeType);
    return router;
};
