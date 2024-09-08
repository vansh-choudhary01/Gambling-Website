const User = require("../db.js");

function account(req, res) {
    res.render("Account/index.ejs");
}

module.exports = account;