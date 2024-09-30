const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

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
  }, 
  bank : {
    name : String,
    number : Number,
    ifsc : String,
  }
}, { versionKey: false });

userSchema.plugin(passportLocalMongoose, {usernameField: 'username'});
const User = new mongoose.model("User", userSchema);

const gameSchema = new mongoose.Schema({
  period : {
    type : Number,
  },
  history : [
    {
      number : Number,
      size : String,
      color : String,
      _id : false,
    },
  ],
  bigAmount : {
    type : Number,
    default : 0,
  },
  smallAmount : {
    type : Number,
    default : 0,
  },
  redAmount : {
    type : Number,
    default : 0,
  },
  greenAmount : {
    type : Number,
    default : 0,
  },
}, {versionKey : false});

const Game = new mongoose.model("Game", gameSchema);

module.exports.user = User;
module.exports.game = Game;
