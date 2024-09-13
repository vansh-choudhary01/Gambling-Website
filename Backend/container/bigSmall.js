const User = require("../db.js").user;
const Game = require("../db.js").game;

async function bigSmall(req, res) {
    let {id} = req.params;
    let user = await User.findById(id);
    let game = await Game.findById('66e3229acbbc7a3b8f228fb5');

    res.render("Big Small/index.ejs", {user, game});
}

module.exports = bigSmall;