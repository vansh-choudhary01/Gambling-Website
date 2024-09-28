const User = require("../db.js").user;
const Game = require("../db.js").game;
const EventEmitter = require("events");
const emitter = new EventEmitter();

setTimeout(() => {
    repeat();
    apiData();
}, (30 - new Date(Date.now()).getSeconds() % 31) * 1000);

const repeat = () => {
    setInterval(() => {
        apiData();
    }, 30 * 1000);
}

let ans = {};
async function apiData(req, res) {
    let randomNo = Math.floor(Math.random() * 10);

    let data = {
        number: randomNo,
        size: randomNo >= 5 ? "big" : "small",
        color: (randomNo % 2 == 0) ? "red" : "green",
    }

    let game = await Game.findById('66e3229acbbc7a3b8f228fb5');
    game.period++;
    while (game.history.length >= 10) {
        game.history.pop();
    }
    game.history.unshift(data);
    await game.save();
    ans = data;
    console.log(data);

    emitter.emit('dataUpdated', ans);
}

async function bet(req, res) {
    let { _id } = req.user;
    let { action, amount } = req.query;
    amount = parseFloat(amount); // Convert amount to a number

    let user = await User.findById(_id);
    let game = await Game.findById('66e3229acbbc7a3b8f228fb5');

    if (user.balance < amount) {
        return res.render("Big Small/index.ejs", { user, game });
    }

    console.log("Waiting for data update...");

    // Wait for the event to fire when data is updated
    emitter.once('dataUpdated', async (result) => {
        console.log(user.balance + " " + amount);
        console.log(result.size + " " + action);
        if (action === result.size || action === result.color || (action === "violet" && (result.number == 0 || result.number == 5))) {
            if (action === "violet") {
                user.balance += amount * 7;
                user.transaction.push(`Won ${amount * 8}`);
            } else {
                user.balance += amount;
                user.transaction.push(`Won ${amount * 2}`);
            }
            console.log("Won");
        } else {
            user.balance -= amount;
            user.transaction.push(`Lose ${amount}`);
            console.log("Lose");
        }
        user.save();

        game = await Game.findById('66e3229acbbc7a3b8f228fb5');
        res.render("Big Small/index.ejs", { user, game });
    });
}

module.exports.bet = bet;
module.exports.apiData = apiData;