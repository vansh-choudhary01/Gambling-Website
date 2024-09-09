const User = require("../db.js");

function bigSmall(req, res) {
    res.render("Big Small/index.ejs");
}

module.exports = bigSmall;