const { Exercize } = require('../controllers/wordExercizeController');

module.exports = (app, db) => {
    const exercizes = new Exercize(db);
    app.get('/word/random', async (req, res) => {
        const word = await exercizes.getExercize();
        res.end('Request result = in Russia - ' + word.russia + ', in English - ' + word.english);
    });
    app.get('/word/random/:type', async (req, res) => {
        const word = await exercizes.getExercizeType(req.params.type);
        if (word)
            res.end(
                'Request result = in Russia - ' + word.russia + ', in English - ' + word.english,
            );
        else res.end(`Data don't exist`);
    });
};
