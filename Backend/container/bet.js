const User = require("../db.js");
const EventEmitter = require("events");
const emitter = new EventEmitter();

let ans = {};
function apiData(req, res) {
    const data = req.body;
    
    // console.log(data);
    ans = data;
    
    emitter.emit('dataUpdated', ans);
    res.json({message : "Data received successfully", data : data});
}

async function bet(req, res) {
    let {id} = req.params;
    let {action, amount} = req.query;
    amount = parseFloat(amount); // Convert amount to a number
    let user = await User.findById(id);

    console.log(user.balance + " " + amount);
    if(user.balance < amount) {
        return res.render("Big Small/index.ejs", {user});
    }
    // user.balance -= amount;
    // user.save();

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

        // ans = {};
        res.render("Big Small/index.ejs", {user});
    });
    // res.render("Big Small/index.ejs", {user});
} 

module.exports.bet = bet;
module.exports.apiData = apiData;