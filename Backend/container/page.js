const { game: Game, user: User } = require("../db.js");


module.exports.route = (req, res) => {
    res.redirect("/user/login");                                                        
}

module.exports.loginPage = (req, res) => {
    let wrong = false;
    res.render("LoginPage/index.ejs", {wrong});
}

module.exports.signupPage = (req, res) => {
    let wrong = false;
    res.render("SignUpPage/index.ejs", {wrong});
}

module.exports.activity = async(req, res) => {
    let {id} = req.params;
    let user = await User.findById(id);
    console.log(user);
    res.render("activity.ejs", {user});
}

module.exports.deposit = async(req, res) => {
    let {id} = req.params;
    let user = await User.findById(id);
    console.log(user);
    res.render("deposit.ejs", {user});
}

module.exports.withdrow = async(req, res) => {
    let {id} = req.params;
    let user = await User.findById(id);
    console.log(user);
    res.render("withdrow.ejs", {user});
}

module.exports.account = async(req, res) => {
    let {id} = req.params;
    let user = await User.findById(id);
    console.log(user);

    res.render("Account/index.ejs", {user});
}

module.exports.bigSmall = async(req, res) => {
    let {id} = req.params;
    let user = await User.findById(id);
    let game = await Game.findById('66e3229acbbc7a3b8f228fb5');

    res.render("Big Small/index.ejs", {user, game});
}

module.exports.login = async(req, res) => {
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

module.exports.user = async(req, res) => {
    let {id} = req.params;
    let user = await User.findById(id);
    console.log(user);
    res.render("Main/index.ejs", {id, user});
}

module.exports.signUp = async(req, res) => {
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
    res.redirect(`/user/${data._id}`);  
}