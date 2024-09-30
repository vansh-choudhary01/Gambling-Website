const { game: Game, user: User } = require("../db.js");


module.exports.route = async(req, res) => {
    await res.redirect("/user");                                                        
}

module.exports.activity = async(req, res) => {
    let {_id} = req.user;
    let user = await User.findById(_id);
    res.render("activity.ejs", {user});
}

module.exports.deposit = async(req, res) => {
    let {_id} = req.user;
    let user = await User.findById(_id);
    res.render("deposit.ejs", {user});
}

module.exports.withdrow = async(req, res) => {
    let {_id} = req.user;
    let user = await User.findById(_id);
    res.render("withdrow.ejs", {user});
}

module.exports.account = async(req, res) => {
    let {_id} = req.user;
    let user = await User.findById(_id);

    res.render("Account/index.ejs", {user});
}

module.exports.promotion = async(req, res) => {
    let {_id} = req.user;
    let user = await User.findById(_id);

    res.render("Admin/index.ejs", {user});
}

module.exports.bigSmall = async(req, res) => {
    let {_id} = req.user;
    let user = await User.findById(_id);
    let game = await Game.findById('66e3229acbbc7a3b8f228fb5');

    res.render("Big Small/index.ejs", {user, game});
}