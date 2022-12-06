const { Exercize } = require('../controllers/wordExercizeController');
const express = require('express');

// Роутеры Слов
module.exports = () => {
    const router = express.Router();
    const exercizes = new Exercize();
    router.get('/random', async (req, res) => {
        const word = await exercizes.getExercize();
        res.end('Request result = in Russia - ' + word.russia + ', in English - ' + word.english);
    });
    router.get('/random/:type', async (req, res) => {
        const word = await exercizes.getExercizeType(req.params.type);
        if (word)
            res.end(
                'Request result = in Russia - ' + word.russia + ', in English - ' + word.english,
            );
        else res.end(`Data don't exist`);
    });
    return router;
};
