const PropertyError = require('./propError');
module.exports = function (data) {
    const errors = [];
    const propArray = [
        { name: 'first_name', maxLength: 20, type: 'string' ,required:true},
        { name: 'last_name', maxLength: 20, type: 'string' ,required:true},
        { name: 'patronymic', maxLength: 20, type: 'string' ,required:true},
        { name: 'email', maxLength: 20, type: 'string', validate: 'email' ,required:true},
        { name: 'password', maxLength: 20, minLength: 6, type: 'string' ,required:true},
    ];
    for (const dataKey in data) {
        const prop = propArray.find((p) => p.name === dataKey);
        prop.data = data[dataKey];
        const error = new PropertyError(prop).test();
        if (error) errors.push({ dataKey: error });
    }

    return errors;
};
