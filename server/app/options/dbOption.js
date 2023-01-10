const { ref, push, getDatabase, child, get } = require('firebase/database');
const config = require('../../config/db');
const { initializeApp } = require('firebase/app');

class Database {
    constructor() {
        const dbApp = initializeApp({ databaseURL: config.url });
        this._database = getDatabase(dbApp);
    }

    readValue(valuePath) {
        return get(child(ref(this._database), valuePath));
    }

    writeValue(path, value) {
        push(ref(this._database, path), value);
    }

    find(table,parameter,value){
        return this._database.ref(table).orderByChild(parameter).equalTo(value).get();
    }
}

module.exports = {
    Database,
};
