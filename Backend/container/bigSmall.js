const User = require("../db.js");

async function bigSmall(req, res) {
    let {id} = req.params;
    let user = await User.findById(id);
    res.render("Big Small/index.ejs", {user});
}

module.exports = bigSmall;