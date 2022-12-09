const User = require("../models/User");

class AuthenticationController{
    constructor() {
        this._model = new User();
    }

    // Авторизация
    auth(req,res){
        console.log(req.body);
        // this._model.user = {
        //
        // }
        res.end('Program end');
    }

    // Вход в систему
    login(body){

    }
}

module.exports = {
    Auth:AuthenticationController
}