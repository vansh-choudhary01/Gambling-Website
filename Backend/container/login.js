const User = require("../db.js");

async function checkUser(req, res) {
    let {mobile, password} = req.query;
    if(!mobile || !password) throw Error("Wrong account");
    let result = await User.findOne({mobile, password});
    console.log(result);
    res.render("Main/index.ejs");
}

module.exports = checkUser;