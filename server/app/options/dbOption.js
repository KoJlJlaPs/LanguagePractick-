const { ref, push, child, get } = require('firebase/database');
const database = require("../firebase/app").database;

class Database {
    readValue(valuePath) {
        return get(child(ref(database), valuePath));
    }

    writeValue(path, value) {
        push(ref(database, path), value);
    }

    find(table,parameter,value){
        return this._database.ref(table).orderByChild(parameter).equalTo(value).get();
    }
}

module.exports = {
    Database,
};
