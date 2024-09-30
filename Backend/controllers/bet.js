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

function rearrangeData(game, data) {
    let change = false;
    if((game.bigAmount > game.smallAmount && data.size == "big") || (game.smallAmount > game.bigAmount && data.size == "small")) {
        data.size = data.size == "small" ? "big" : "small";
        change = true;
    }
    if((game.redAmount > game.greenAmount && data.color == "red") || (game.greenAmount > game.redAmount && data.color == "green")) {
        data.color = data.color == "green" ? "red" : "green";
        change = true;
    }

    if(data.size == "small" && change) {
        data.number = Math.floor(Math.random() * 6);
    } else if (data.size == "big" && change) {
        data.number = Math.floor(Math.random() * 5) + 5;
    }

    if(data.color == "red" && data.number % 2 != 0) {
        if(data.number == 5) {
            data.number--;
        } else {
            data.number++;
        }
    } else if(data.color == "green" && data.number % 2 == 0) {
        if(data.number == 0) {
            data.number++;
        } else {
            data.number--;
        }
    }
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
    
    //result is set according to user's pridiction
    rearrangeData(game, data);
    
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

    if (!action || !amount || user.balance < amount) {
        return res.redirect("/user/colors");
    }

    if(action == 'big') game.bigAmount += amount;
    else if(action == 'small') game.smallAmount += amount;
    else if(action == 'red') game.redAmount += amount;
    else if(action == 'green') game.greenAmount += amount;
    await game.save();

    console.log("Waiting for data update...");
    user.balance -= amount;
    user.save();

    // Wait for the event to fire when data is updated
    emitter.once('dataUpdated', async (result) => {
        console.log(user.balance + " " + amount);
        console.log(result.size + " " + action);
        if (action === result.size || action === result.color || (action === "violet" && (result.number == 0 || result.number == 5))) {
            if (action === "violet") {
                user.balance += amount * 3;
                user.transaction.unshift(`Won ${amount * 3}`);
            } else {
                user.balance += amount * 2;
                user.transaction.unshift(`Won ${amount * 2}`);
            }
            console.log("Won");
        } else {
            // user.balance -= amount;
            user.transaction.unshift(`Lose ${amount}`);
            console.log("Lose");
        }

        while(user.transaction.length > 10) {
            user.transaction.pop();
        }
        try {
            user.save();
        } catch(e) {
            console.log(e);
        }


        game.bigAmount = 0;
        game.smallAmount = 0;
        game.redAmount = 0;
        game.greenAmount = 0;
        await game.save();
    });
    res.redirect("/user/colors");
}

module.exports.bet = bet;
module.exports.apiData = apiData;