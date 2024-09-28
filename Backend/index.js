const express = require("express");
const app = express();
const path = require("path");
const route = require("./route.js");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const passport = require('passport')
const LocalStrategy = require("passport-local");
require('dotenv').config(); 

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

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", route);

const server = app.listen(8080, () => {
    console.log('server is listening on post 8080');
});