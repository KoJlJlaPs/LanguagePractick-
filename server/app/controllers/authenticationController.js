const User = require("../models/User");

class AuthenticationController{
    constructor() {
        this._model = new User();
    }

    // Авторизация
    auth(req,res){
        console.log(req);
        // this._model.user = {
        //
        // }
        res.end('Program end');
    }

    // Вход в систему
    login(req,res){

    }
}

module.exports = {
    Auth:AuthenticationController
}