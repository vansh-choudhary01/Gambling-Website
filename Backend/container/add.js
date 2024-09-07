const User = require("../db.js");

async function addUser(req, res) {
    let {mobile , password, conform} = req.body;
    if(!mobile || !password) throw Error("Wrong account");
    let present = await User.findOne({mobile});
    // console.log(present);
    if(password != conform || present) {
        let wrong = true;
        res.render("SignUpPage/index.ejs", {wrong});
    }
    let user = new User({mobile, password});
    let data = await user.save();
    // console.log(data);
    res.render("Main/index.ejs");
}

module.exports = addUser;