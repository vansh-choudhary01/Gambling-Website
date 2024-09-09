const User = require("../db.js");

function user(req, res) {
    res.render("Main/index.ejs");
}

module.exports = user;