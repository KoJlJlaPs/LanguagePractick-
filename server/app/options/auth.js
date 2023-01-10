import {User} from "../models/User";
const jwt = require("jsonwebtoken");
const argon2 = require('argon2');
const signature = require("../../config/signature");

export class AuthService{
    _model;
    constructor() {
        this._model = new User();
    }

    async signUp(email,name,password){
       const passwordHashed = await argon2.hash(password);

        this._model.setUser({
            password: passwordHashed,
            email,
            name,
        });
        return {
            user:{
                email,name
            }
        };
    }

    async login(email,password){
        const userRecord = await this._model.findOneByEmail(email);
        if (!userRecord) {
             throw Error('User not found');
        } else {
            const correctPassword = await argon2.verify(userRecord.password, password);
            if (!correctPassword) {
                throw Error('Incorrect password');
            }
        }

        return {
            user: {
                email: userRecord.email,
                name: userRecord.name,
            },
            token: this._generateToken(userRecord),
        };
    }

    _generateToken(user) {
        const data =  {
            _id: user._id,
            name: user.name,
            email: user.email
        };
        const expiration = '6h';

        return jwt.sign({ data, }, signature, { expiresIn: expiration });

    }
}