const {Database} = require("../database/dbOption");

class User{
    constructor() {
        this._database = new Database();
    }

    get users() {
        return this._database.readValue('users');
    }

    set user(value) {
        this._database.writeValue('users/', value);
    }

    getUser(id){
        return this._database.readValue('users/'+id);
    }
}

module.exports = User;