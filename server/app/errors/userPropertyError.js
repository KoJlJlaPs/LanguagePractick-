// Проверка приходящих данных при авторизации пользователя
module.exports = function (data) {
    return require('./testProperties')(
        [
            { name: 'first_name', maxlength: 20, type: 'string', required: true },
            { name: 'last_name', maxlength: 20, type: 'string', required: true },
            { name: 'patronymic', maxlength: 20, type: 'string', required: true },
            { name: 'email', maxlength: 20, type: 'string', validate: 'email', required: true },
            { name: 'password', maxlength: 20, minlength: 6, type: 'string', required: true },
        ],
        data,
    );
};
