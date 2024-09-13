const User = require("../db.js").user;

async function account(req, res) {
    let {id} = req.params;
    let user = await User.findById(id);
    res.render("Account/index.ejs", {user});
}

module.exports = account;