const User = require("../db.js");
// const result = require("../../Frontend/Big Small/app.js");
const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/data", (req, res) => {
    const data = req.body;

    console.log("Data recieved from cliend : " + data);

    res.json({message : "Data received successfully", data : data});
})

async function bet(req, res) {
    let {id} = req.params;
    let {action, amount} = req.query;
    let user = await User.findById(id);

    if(user.balance < amount) {
        res.redirect(`/user/colors/${id}`);
    }

    setTimeout(async () => {
        result = await data();
        if(action == result.size) {
            user.balance += amount;
            user.transaction.push(`Won ${amount * 2}`);
        } else {
            user.balance -= amount;
            user.transaction.push(`Lose ${amount}`);
        }
    }, 0);

    res.redirect(`/user/colors/${id}`);
} 

module.exports = bet;