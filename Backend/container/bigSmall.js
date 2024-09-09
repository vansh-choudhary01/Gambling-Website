const User = require("../db.js");

function bigSmall(req, res) {
    let {transection, Amount, total, select=""}= req.query;
    if(select===answer){
        total=transection+Amount;
        transection.push(Amount)
    }else{
        total=transection-Amount;
        transection.push(-Amount)
    }
   

    res.render("Big Small/index.ejs");
}

module.exports = bigSmall;