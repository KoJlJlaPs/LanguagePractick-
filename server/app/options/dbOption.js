const {
    ref,
    push,
    child,
    get,
    onValue,
    orderByValue,
    orderByChild,
    query,
    equalTo,
    limitToFirst,
} = require('firebase/database');
const { database } = require('../firebase/app');

class Database {
    readValue(valuePath) {
        return get(child(ref(database), valuePath));
    }

    writeValue(path, value) {
        push(ref(database, path), value);
    }

    find(table, parameter, value) {
        return new Promise((resolve) => {
            const refData = query(ref(database, table), orderByChild(parameter), equalTo(value));
            onValue(refData, (snapshot) => {
                const value = [];
                const snap = snapshot.val();
                for (const snapshotKey in snap) value.push(snap[snapshotKey]);
                resolve(value);
            });
        });
    }
}

module.exports = {
    Database,
};
