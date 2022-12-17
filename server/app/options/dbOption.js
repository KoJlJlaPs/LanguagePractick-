const { ref, push, child, get } = require('firebase/database');
const database = require("../firebase/app").database;

class Database {
    readValue(valuePath) {
        return get(child(ref(database), valuePath));
    }

    writeValue(path, value) {
        push(ref(database, path), value);
    }
}

module.exports = {
    Database,
};
