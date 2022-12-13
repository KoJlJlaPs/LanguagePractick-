const User = require('../models/User');
const testAuthProperty = require('../errors/userPropertyError');

class AuthenticationController {
    constructor() {
        this._model = new User();
    }

    // Авторизация
    auth(req, res) {
        const data = req.query;
        const errors = testAuthProperty(data);
        if(errors.length > 0){
            res.statusCode = 301;
            res.json(errors);
            return;
        }

        res.statusCode = 200;
        res.json({ message: 'Good' });
    }

    // Вход в систему
    login(req, res) {}
}

module.exports = {
    Auth: AuthenticationController,
};
