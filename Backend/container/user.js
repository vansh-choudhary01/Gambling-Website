const User = require("../db.js");

function user(req, res) {
    let {id} = req.params;
    res.render("Main/index.ejs", {id});
}

module.exports = user;