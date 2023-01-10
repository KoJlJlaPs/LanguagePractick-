const { Database } = require('../options/dbOption');

class User {
    constructor() {
        this._database = new Database();
    }

    get users() {
        return this._database.readValue('users');
    }

    setUser(value) {
        this._database.writeValue('users/', value);
    }

    getUser(id) {
        return this._database.readValue('users/' + id);
    }

    findOneByEmail(email){
        return this._database.find('user',"email",email);
    }
}

module.exports = { User };
