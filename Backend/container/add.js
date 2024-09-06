const User = require("../db.js");

async function addUser(req, res) {
    let {mobile , password} = req.body;
    let user = new User({mobile, password});
    let data = await user.save();
    console.log(data);
    res.render("Main/index.ejs");
}

module.exports = addUser;