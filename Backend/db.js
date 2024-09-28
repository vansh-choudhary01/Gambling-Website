const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Daman");
}

main().then(() => {
  console.log("connected database"); 
}) .catch(e => {
  console.log(e);
});

const userSchema = new mongoose.Schema({
  transaction: [],
  balance: {
    type: Number,
    default: 0,
  },
  email : {
    type: String,
    required : true,
    unique: true,  // Ensure that the email is unique
    trim: true,    // Optional: removes whitespace from both ends
    lowercase: true // Optional: ensures that the email is stored in lowercase
  },
  username: {
    type: String,
    required: true,
    unique: true,  // Ensure that the username is unique
    trim: true
  }
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'username'});
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
