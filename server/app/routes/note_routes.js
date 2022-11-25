const { ref, set } = require("firebase/database");
module.exports = function (app, db) {
  app.post("/notes", (req, res) => {
    const body = req.body;
    console.log(req.body);
    const note = { text: body.body, title: body.title };
    set(ref(db, "notes"), note);
  });
};
