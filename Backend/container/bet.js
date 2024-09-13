const User = require("../db.js").user;
const Game = require("../db.js").game;
const EventEmitter = require("events");
const emitter = new EventEmitter();

let ans = {};
async function apiData(req, res) {
    const data = req.body;
    let game = await Game.findById('66e3229acbbc7a3b8f228fb5');
    game.period++;
    while(game.history.length >= 10) {
        game.history.pop();
    }
    game.history.unshift(data);
    console.log(await game.save());
    ans = data;
    
    emitter.emit('dataUpdated', ans);
    res.json({message : "Data received successfully", data : data});
}

async function bet(req, res) {
    let {id} = req.params;
    let {action, amount} = req.query;
    amount = parseFloat(amount); // Convert amount to a number
    
    let user = await User.findById(id);
    let game = await Game.findById('66e3229acbbc7a3b8f228fb5');
    
    if(user.balance < amount) {
        return res.render("Big Small/index.ejs", {user, game});
    }

    console.log("Waiting for data update...");

    // Wait for the event to fire when data is updated
    emitter.once('dataUpdated', (result) => {
        console.log(result.size + " " + action);
        if (action === result.size) {
            user.balance += amount;
            user.transaction.push(`Won ${amount * 2}`);
            console.log("Won");
        } else {
            user.balance -= amount;
            user.transaction.push(`Lose ${amount}`);
            console.log("Lose");
        }
        user.save();

        res.render("Big Small/index.ejs", {user, game});
    });
} 

module.exports.bet = bet;
module.exports.apiData = apiData;