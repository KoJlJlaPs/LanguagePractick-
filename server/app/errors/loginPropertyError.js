module.exports = function (data) {
    return require('./testProperties')(
        [
            { name: 'email', maxlength: 20, type: 'string', validate: 'email', required: true },
            { name: 'password', maxlength: 20, minlength: 6, type: 'string', required: true },
        ],
        data,
    );
};
