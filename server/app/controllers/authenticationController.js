const { User } = require('../models/User');
const auth = require('../firebase-auth/auth');
const testAuthProperty = require('../errors/userPropertyError');

class AuthenticationController {
    _model;

    constructor() {
        this._model = new User();
    }

    // Авторизация
    auth(req, res) {
        const data = req.query;
        const errors = testAuthProperty(data);
        if (errors.length > 0) {
            res.status(301).json(errors);
            return;
        }
        auth.createUser({
            email: data.email,
            displayName:
                data.first_name +
                ' ' +
                data.last_name[0].toUpperCase() +
                '.' +
                data.patronymic[0].toUpperCase() +
                '.',
            password: data.password,
        })
            .then((result) => {
                this._createUser(result.uid);
                res.statusCode = 200;
                res.json({ message: 'Good' });
            })
            .catch((error) => {
                console.log('Error: ' + error);
                res.status(301).json({ error: error.message });
            });
    }

    _createUser(uid) {
        this._model.setUser({
            words: '',
            id: uid,
        });
    }

    // Вход в систему
    login(req, res) {}
}

module.exports = AuthenticationController;
