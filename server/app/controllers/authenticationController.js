const testAuthProperty = require('../errors/userPropertyError');
const testLoginProperty = require('../errors/loginPropertyError');
const AuthService = require('../auth/authServices');

class AuthenticationController {
    constructor() {
        this._service = new AuthService();
    }

    // Авторизация
    auth(req, res) {
        const data = req.query;
        if (!data) {
            res.status(301).json({ errors: 'Пустые данные' });
            return;
        }
        const errors = testAuthProperty(data);
        if (errors.length > 0) {
            res.status(301).json(errors);
            return;
        }
        this._service
            .signUp(
                data.email,
                data.first_name + ' ' + data.last_name + ' ' + data.patronymic,
                data.password,
            )
            .then(() => {
                res.statusCode = 200;
                res.json({ message: 'Good' });
            })
            .catch((error) => {
                console.log(error);
                res.status(301).json({ error: error.message });
            });
    }

    // Вход в систему
    login(req, res) {
        const data = req.query;
        if (!data) {
            res.status(301).json({ errors: 'Пустые данные' });
            return;
        }
        const errors = testLoginProperty(data);
        if (errors.length > 0) {
            res.status(301).json(errors);
            return;
        }
        this._service
            .login(data.email, data.password)
            .then((data) => {
                res.statusCode = 200;
                res.setHeader('Authorization', 'Bearer ' + data.token);
                res.json({
                    message: 'Good',
                    data: {
                        email: data.user.email,
                        name: data.user.name,
                        token: data.token
                    },
                });
            })
            .catch((error) => {
                res.status(401).json({ error: error.message });
            });
    }

    logout(req,res){
        res.setHeader("Authorization","");
    }
}

module.exports = AuthenticationController;
