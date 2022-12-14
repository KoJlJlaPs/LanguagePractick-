const auth = require('firebase-admin');
const db = require('../../config/db');

const serviceAccount = require('../../config/learning-project-87d6c-firebase-adminsdk-1y69w-f4643bf007.json');
const { getAuth } = require('firebase-admin/auth');

const app = auth.initializeApp({
    credential: auth.credential.cert(serviceAccount),
    databaseURL: db.url,
});

module.exports = getAuth(app);
