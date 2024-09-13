const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Daman");
}

const userSchema = new mongoose.Schema({
  transaction: [],
  balance: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
});

const User = new mongoose.model("User", userSchema);

const gameSchema = new mongoose.Schema({
  period : Number,
  history : [
    {
      number : Number,
      size : String,
      color : String,
      _id : false,
    },
  ],
}, {versionKey : false});

const Game = new mongoose.model("Game", gameSchema);

module.exports.user = User;
module.exports.game = Game;
