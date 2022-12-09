const { Words } = require('./../models/Words');

class WordExercize {
    constructor() {
        this._model = new Words();
        this._words = [];
        this._wordsByType = [];
        this._type = '';
        this._wordByTypeNumber = 0;
        this._wordNumber = 0;
    }

    // Получение слова по теме
    async getExercizeType(req,res) {
        const type = req.params.type;
        let result = true;
        if (
            this._type !== '' ||
            this._type !== type ||
            (this._wordsByType.length > 0 && this._wordByTypeNumber === this._wordsByType.length)
        )
            result = await this._setWordsByType(type);
        if (result) {
            const word =  this._wordsByType[this._wordByTypeNumber++];
            res.end(
                'Request result = in Russia - ' + word.russia + ', in English - ' + word.english,
            );
        }
        else res.end(`Data don't exist`);
    }

    // Получение слова
    async getExercize(req,res) {
        if (this._words.length === 0 || this._wordNumber === this._words.length)
            await this._setWords();
        const word = this._words[this._wordNumber++];
        res.end('Request result = in Russia - ' + word.russia + ', in English - ' + word.english);
    }

    // Установление всех слов
    _setWords() {
        return new Promise((resolve) => {
            const snapshot = this._model.words;
            resolve(snapshot);
        }).then((snapshot) => {
            snapshot.forEach((child) => {
                child.forEach((el) => {
                    this._words.push(el.val());
                });
            });
            shuffle(this._words);
        });
    }

    // Установление слов по теме
    _setWordsByType(type) {
        return new Promise((resolve) => {
            if (this._type === type) {
                shuffle(this._wordsByType);
                resolve(false);
            } else {
                this._type = type;
                const snapshot = this._model.getByTopic(this._type);
                resolve(snapshot);
            }
        }).then((snapshot) => {
            if (!snapshot) return true;
            if (snapshot.exists()) {
                this._wordsByType = [];
                snapshot.forEach((child) => {
                    this._wordsByType.push(child.val());
                });
                shuffle(this._wordsByType);
                return true;
            }
            return false;
        });
    }
}

// Рандомизирование массива
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

module.exports = {
    Exercize: WordExercize,
};
