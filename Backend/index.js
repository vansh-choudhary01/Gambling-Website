const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const route = require("./route.js");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const passport = require('passport')
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
require('dotenv').config(); 

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Daman");
  }
  
  main().then(() => {
    console.log("connected database"); 
  }) .catch(e => {
    console.log(e);
  });

const {user : User} = require("./db.js");

const sessionOptions = ({
    secret : "mysecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 24 * 60 * 60 * 1000,
        maxAge : 24 * 60 * 60 * 1000,
        httpOnly : true
    }
})

app.use(session(sessionOptions));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../Frontend"));
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.engine('ejs', ejsMate);
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    next();
})

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", route);

const server = app.listen(8080, () => {
    console.log('server is listening on post 8080');
});