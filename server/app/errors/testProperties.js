const PropertyError = require('./propError');

module.exports = function (propArray,data){
    const errors = [];
    for (const dataKey in data) {
        const prop = propArray.find((p) => p.name === dataKey);
        prop.data = data[dataKey];
        const error = new PropertyError(prop).test();
        if (error) errors.push({ [dataKey]: error });
    }

    return errors;
}