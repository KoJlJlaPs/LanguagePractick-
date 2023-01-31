const {
    ref,
    push,
    child,
    get,
    onValue,
    orderByChild,
    query,
    equalTo,
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
                const snap = snapshot.val();
                if(snap == null)
                    resolve({error:'Data don`t founded'});
                else{
                    const key = Object.keys(snap)[0];
                    const value = {
                        _id:key,
                        ...snap[key]
                    };
                    resolve(value);
                }
            });
        });
    }
}

module.exports = {
    Database,
};
