// Класс для проверки валидности переменных
class PropertyError {
    _data;
    _name;
    _type;
    _minlength;
    _maxlength;
    _validate;
    constructor({ name, data, type, minlength, maxlength, validate }) {
        this._data = data;
        this._name = name;
        this._type = type;
        this._minlength = minlength;
        this._maxlength = maxlength;
        this._validate = validate;
    }

    get minLengthError() {
        return `Переменная ${this._name} не должна иметь длину меньше ${this._minlength} символов`;
    }

    get maxLengthError() {
        return `Переменная ${this._name} не должна иметь длину больше ${this._maxlength} символов`;
    }

    get typeError() {
        return `Переменная ${this._name} должна иметь тип ${this._type}`;
    }

    get emailValidateError() {
        return `Переменная ${this._name} должна иметь вид email`;
    }

    test() {
        if (this._type && typeof this._data !== this._type) return this.typeError;
        if (this._minlength && this._data.length < this._minlength) return this.minLengthError;
        if (this._maxlength && this._data.length > this._maxlength) return this.maxLengthError;
        if (this._validate === 'email' && !this._data.match(/^\S+@\S+\.\S+$/))
            return this.emailValidateError;
    }
}

module.exports = PropertyError;
