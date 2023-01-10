const testAuthProperty = require('../errors/userPropertyError');
const {AuthService} = require("../options/auth");

class AuthenticationController {
    constructor() {
        this._service = new AuthService();
    }
    // Авторизация
    auth(req, res) {
        const data = req.query;
        const errors = testAuthProperty(data);
        if (errors.length > 0) {
            res.status(301).json(errors);
            return;
        }
        this._service.signUp(data.email,
                data.first_name +
                ' ' +
                data.last_name +
                '.' +
                data.patronymic +
                '.', data.password)
            .then(() => {
                res.statusCode = 200;
                res.json({ message: 'Good' });
            })
            .catch((error) => {
                console.log('Error: ' + error);
                res.status(301).json({ error: error.message });
            });
    }

    // Вход в систему
    login(req, res) {}
}

module.exports = AuthenticationController;
