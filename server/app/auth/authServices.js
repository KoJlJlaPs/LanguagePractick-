const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { signature } = require('../../config/signature');

// Класс авторизации
module.exports = class AuthService {
    _model;
    constructor() {
        this._model = new User();
    }

    async signUp(email, name, password) {
        let userRecord = await this._model.findOneByEmail(email);
        if (!userRecord.error) throw Error('Email is not unique');
        const passwordHashed = await argon2.hash(password);

        this._model.setUser({
            password: passwordHashed,
            email,
            name,
        });

        return {
            user: {
                email,
                name,
            },
        };
    }

    async login(email, password) {
        let record = await this._model.findOneByEmail(email);
        if (record.error) throw Error('User not found');
        const correctPassword = await argon2.verify(record.password, password);
        if (!correctPassword) throw Error('Incorrect password');

        return {
            user: {
                email: record.email,
                name: record.name,
            },
            token: this._generateToken(record),
        };
    }

    _generateToken(user) {
        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };
        const expiration = '6h';

        return jwt.sign({ data }, signature, { expiresIn: expiration });
    }
};
