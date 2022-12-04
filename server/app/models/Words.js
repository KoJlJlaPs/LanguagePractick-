const { Database } = require('../database/dbOption');

// Модель Слов
class Words {
    constructor() {
        this._database = new Database();
    }

    get words() {
        return this._database.readValue('words');
    }

    set word({ topic, value }) {
        this._database.writeValue('words/' + topic, value);
    }

    getByTopic(topic) {
        return this._database.readValue('words' + topic);
    }
}

module.exports = {
    Words,
};
