const User = require("../db.js");

async function bigSmall(req, res) {
    let { transection = [], Amount, total, select = "" } = req.body;
    let id = req.params.id; 
    Amount = Number(Amount);
    if (isNaN(Amount)) {
      return res.status(400).send("Invalid Amount value.");
    }
    let searchUser1 = await User.findOne({ _id: id})
    console.log(searchUser1)
    let answer = "red";
  
    if (select === answer) {
      searchUser1.total  += Amount;
      searchUser1.transection.push(Amount);
    } else {
      searchUser1.total -= Amount;
      searchUser1.transection.push(-Amount);
    }
  
    try {
      let searchUser = await User.findOneAndUpdate(
        { _id: id }, 
        {
          transection: searchUser1.transection,
          Amount: searchUser1.Amount,
          total: searchUser1.total,
        },
        { new: true }
      );
  
      if (!searchUser) {
        return res.status(404).send("User not found");
      }

      res.render("BigSmall/index.ejs", { searchUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Internal server error");
    }
}

module.exports = bigSmall;