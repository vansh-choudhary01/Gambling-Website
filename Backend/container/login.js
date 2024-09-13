const User = require("../db.js").user;

async function checkUser(req, res) {
    let {mobile, password} = req.query;
    if(!mobile || !password) throw Error("Wrong account");
    let result = await User.findOne(req.query);
    // console.log(result._id);
    if(result) {
        res.redirect(`/user/${result._id}`);
    } else {
        let wrong = true;
        res.render("LoginPage/index.ejs", {wrong});
    }
}

module.exports = checkUser;