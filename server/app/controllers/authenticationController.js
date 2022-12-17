const { User } = require('../models/User');
const auth = require('../firebase/app').auth;
const testAuthProperty = require('../errors/userPropertyError');
const testLoginProperty = require('../errors/loginPropertyError');
const { createUserWithEmailAndPassword } = require('firebase/auth');

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
        createUserWithEmailAndPassword(auth,data.email,data.password)
            .then((result) => {
                this._createUser(result.user.uid,data);
                res.statusCode = 200;
                res.json({ message: 'Good' });
            })
            .catch((error) => {
                console.log('Error: ' + error);
                res.status(301).json({ error: error.message });
            });
    }

    _createUser(uid,data) {
        this._model.setUser({
            words: '',
            id: uid,
            last_name:data.last_name,
            first_name:data.first_name,
            patronymic:data.patronymic
        });
    }

    // Вход в систему
    login(req, res) {
        const data = req.query;
        const errors = testLoginProperty(data);
        if (errors.length > 0) {
            res.status(301).json(errors);
            return;
        }
        auth.signInWithEmailAndPassword(data.email,data.password).then((result)=>{
            res.status(200).json({message:"Good"});
        }).catch((e)=>{
            console.log('Error: ' + error);
            res.status(301).json({ error: error.message });
        });
    }
}

module.exports = AuthenticationController;
