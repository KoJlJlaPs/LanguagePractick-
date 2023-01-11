const PropertyError = require('./propError');

// Проверка параметров
module.exports = function (propArray, data) {
    const errors = [];
    for (const propKey in propArray) {
        const prop = propArray[propKey];
        const propData = data[prop.name];
        if (prop.required && !propData)
            errors.push({ [prop.name]: `Нет обязательной переменной ${prop.name}` });
        else {
            prop.data = propData;
            const error = new PropertyError(prop).test();
            if (error) errors.push({ [prop.name]: error });
        }
    }
    return errors;
};
